var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');
var Product = mongoose.model('Product');

module.exports = function() {
	return {
		show: function (req, res) {
			Order.find({$query: {}, $orderby: {date: -1}}, function (err, results) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(results);
				}
			})
		},
		add: function (req, res) {
			console.log("req.body: ", req.body);
			newOrder = new Order({_customer: req.body.customer._id, name: req.body.customer.name, product: req.body.product.name, quantity: req.body.quantity, date: new Date(), _product: req.body.product._id});
			newOrder.save(function (err, addedOrder) {
				if(err) {
					console.log("Save unsuccessful");
				}
				else {
					Customer.update({name: req.body.customer.name}, {$push: {'orders': newOrder}}, {safe: true, upsert: true, new:true}, function (err, model){
						if(err) {
							console.log("Customer couldn't be updated");
						}
						else {
							Product.update({name: req.body.product.name}, {$push: {'orders': newOrder}}, {safe: true, upsert: true, new:true}, function (err, model) {
								if(err) {
									console.log("Product couldn't be updated");
								}
								else {
									Product.update({name: req.body.product.name}, {$inc: {init_quantity: -req.body.quantity}}, {}, function (err, model) {
										if(err) {
											console.log("Quantity could not be updated", err);
										}
										else {
											res.json(newOrder);
										}
									})
								}
							})
						}
					})
				}
			})
		}
	}
}()