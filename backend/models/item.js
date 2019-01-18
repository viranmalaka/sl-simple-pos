var mongoose = require('mongoose');
var bycrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var schema = new Schema({
    name : {
        type : String, 
        required : true, 
    },
    unitPrice : {
        type : Number, 
        required : true,
    }, 
    description: {
        type: String
    }
});

module.exports = mongoose.model('Item', schema);