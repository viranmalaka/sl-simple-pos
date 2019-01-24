var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    items : {
        type: [{item: Schema.Types.ObjectId, quantity: Number}], 
        ref: 'Item'
    },
    status : {
        type : String, 
        required : true,
    }
});

module.exports = mongoose.model('Order', schema);