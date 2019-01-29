var mongoose = require('mongoose');
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
