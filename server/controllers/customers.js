var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = function(){
	return {
		show: function (req, res) {
			Customer.find({$query: {}, $orderby: {date: -1}}, function (err, results) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(results);
				}
			})
		},
		add: function (req, res) {
			var customer = new Customer({name: req.body.name});
			customer.save(function (err, results) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(results);
				}
			})
		},
		remove: function (req, res) {
			Customer.remove({_id: req.body.id}, function (err, results) {
				if(err) {
					console.log(err);
				}
				else {
					res.end();
				}
			})
		}
	}
}()