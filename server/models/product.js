var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	name: String,
	image: String,
	description: String,
	init_quantity: Number,
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

mongoose.model('Product', productSchema);