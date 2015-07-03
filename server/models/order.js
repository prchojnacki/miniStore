var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	_customer: {type: Schema.ObjectId, ref: 'Customer'},
	name: String,
	product: String,
	quantity: Number,
	date: {type: Date, default: Date.now},
	_product: {type: Schema.ObjectId, ref: 'Product'}
})

mongoose.model('Order', orderSchema);