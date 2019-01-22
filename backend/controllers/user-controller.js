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
  return new Promise((resolve, reject) => {
    User.findOne({
      username: user.username
    }).then((result) => {
      if (result) {
        reject([403, 'username already exist']);
      } else {
        bycrypt.genSalt(10).then((salt) => {
          bycrypt.hash(user.password, salt).then((hash) => {
            user.password = hash;
            new User(user).save().then((result) => {
              delete result.password;
              delete result._v;
              resolve(result);
            }).catch((err) => {
              reject([500, err]);
            });
          }).catch((err) => {
            reject([500, err]);
          });
        }).catch((err) => {
          reject([500, err]);
        });
      }
    }).catch((err) => {
      reject([500, err]);
    });
  });
};


const login = (user) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: user.username})
    .select('+password')
    .exec().then((dbUser) => {
      if(dbUser) {
        bycrypt.compare(user.password, dbUser.password).then((isMatch) => {
          if(isMatch) {
            jwt.sign(dbUser._doc, SECRET, {expiresIn: '10h'}, (err, token) => {
              if(err) {
                reject([500, 'Something went wrong']);
              } else {
                resolve(token);
              }
            });
          } else {
            reject([403, 'Password is wrong']);
          }
        }).catch((err) => {
          reject([500, 'Something went wrong']);
        });
      } else {
        reject([404, 'User Not Found']);
      }
    }).catch((err) => {
      reject([500, err]);
    });
  });
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