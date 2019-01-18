var mongoose = require('mongoose');
var bycrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var schema = new Schema({
    username : {
        type : String, 
        required : true, 
        unique: true,
        dropDups: true
    },
    password : {
        type : String, 
        required : true,
        select: false
    }
});

module.exports = mongoose.model('User', schema);

module.exports.createUser = (newUser, cb) => {
    bycrypt.genSalt(10, (err, salt) => {
        bycrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(cb);
        })
    });
};

module.exports.comparePassword = (candidatePassword, hash, cb) => {
    bycrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err){
            console.log(err);
        }else{
            cb(null, isMatch);
        }
    });
};