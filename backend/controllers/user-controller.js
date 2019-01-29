var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bycrypt = require('bcryptjs');

const SECRET = 'shhhhh';

const verifyToken = (token, cb) => {
  // TODO: use a promise
  jwt.verify(token, SECRET, (err, data) => { // verify the given token
    if (err) {
      cb(false); // false verification
    } else {
      cb(data);   // success verification and send the data
    }
  });
};

const createUser = (user) => {
  return User.findOne({ username: user.username }).then(async (result) => { // find user by id
    if (!user.username) { // basic required validation 
      throw [400, "username is Required"]
    }
    if (!user.password) {
      throw [400, "Password is Required"]
    }
    if (result) {
      throw [401, 'username already exist']; // exception - if user is already exist
    } else {
      try {
        const salt = await bycrypt.genSalt(10); // generate a salt
        const hash = await bycrypt.hash(user.password, salt); // generate the hash of the password
        user.password = hash; 
        return new User(user).save(); // save
      } catch (error) {
        throw error; // exception
      }
    }
  })
};


const login = (user) => {
  return User.findOne({ username: user.username }) // find the user by username
    .select('+password')  // with password field
    .exec().then(dbUser => {
      if (dbUser) {       // if there is an user
        return bycrypt.compare(user.password, dbUser.password).then((isMatch) => {
          if (isMatch) {  // password is matched
            return new Promise((resolve, reject) => {
              // create a token 
              jwt.sign(dbUser._doc, SECRET, { expiresIn: '10h' }, (err, token) => {
                if (err) {
                  reject([500, err]);
                } else {
                  resolve(token); // pass the token
                }
              })
            });
          } else {
            throw [401, "Invalid Password"] // exception
          }
        });
      } else {
        throw [401, "User Not Found"] // exception
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