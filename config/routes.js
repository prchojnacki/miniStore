var customers = require('../server/controllers/customers.js');
var orders = require('../server/controllers/orders.js');
var products = require('../server/controllers/products.js');

module.exports = function (app) {
	app.get('/customers', function (req, res) {
		customers.show(req, res);
	})
	app.post('/addcustomer', function (req, res) {
		customers.add(req, res);
	})
	app.post('/deletecustomer', function (req, res) {
		customers.remove(req, res);
	})
	app.get('/orders', function (req, res) {
		orders.show(req, res);
	})
	app.get('/products', function (req, res) {
		products.show(req, res);
	})
	app.post('/addproduct', function (req, res) {
		products.add(req, res);
	})
	app.post('/addorder', function (req, res) {
		orders.add(req, res);
	})
}