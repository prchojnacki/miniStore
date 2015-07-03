var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = function() {
	return {
		show: function (req, res) {
			Product.find({}, function (err, results) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(results);
				}
			})
		},
		add: function (req, res) {
			var product = new Product({name: req.body.name, image: req.body.image, description: req.body.description, init_quantity: req.body.init_quantity});
			product.save(function (err, results) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(results);
				}
			})
		}
	}
}()