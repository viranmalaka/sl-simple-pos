var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

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

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, { model: 'Order', field: 'orderId', startAt: 10000 })

module.exports = mongoose.model('Order', schema);