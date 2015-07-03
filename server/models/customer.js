var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
	name: String,
	date: {type: Date, default: Date.now},
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

mongoose.model('Customer', customerSchema);