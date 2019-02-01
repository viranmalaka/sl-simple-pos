var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
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

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, { model: 'Item', field: 'itemId', startAt: 1000 })

module.exports = mongoose.model('Item', schema);