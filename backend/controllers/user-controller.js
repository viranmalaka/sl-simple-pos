var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bycrypt = require('bcryptjs');

const SECRET = 'shhhhh';

const verifyToken = (token, cb) => {
  // TODO: use a promise
  jwt.verify(token, SECRET, (err, data) => {
    if (err) {
      cb(false);
    } else {
      cb(data);
    }
  });
};

const createUser = (user) => {
  return User.findOne({ username: user.username }).then(async (result) => {
    if (!user.username || user.username === '') {
      throw "username is Required"
    }
    if (!user.password || user.password === '') {
      throw "Password is Required"
    }
    if (result) {
      throw 'username already exist';
    } else {
      try {
        const salt = await bycrypt.genSalt(10);
        const hash = await bycrypt.hash(user.password, salt);
        user.password = hash;
        return new User(user).save();
      } catch (error) {
        throw error;
      }
    }
  })
};


const login = (user) => {
  return User.findOne({ username: user.username })
    .select('+password')
    .exec().then(dbUser => {
      if (dbUser) {
        return bycrypt.compare(user.password, dbUser.password).then((isMatch) => {
          if (isMatch) {
            return new Promise((resolve, reject) => {
              jwt.sign(dbUser._doc, SECRET, { expiresIn: '10h' }, (err, token) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(token);
                }
              })
            });
          } else {
            throw "Invalid Password"
          }
        });
      } else {
        throw "User Not Found"
      }
    })
};

const findOneAndDelete = (query) => {
  return User.findOneAndDelete(query);
};

module.exports = {
  verifyToken,
  createUser,
  login,
  findOneAndDelete,
};