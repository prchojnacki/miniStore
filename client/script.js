var storeApp = angular.module('storeApp', ['ngRoute']);

storeApp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/dashboard.html'
	})
	.when('/orders',{
		templateUrl: 'partials/orders.html'
	})
	.when('/products',{
		templateUrl: 'partials/products.html'
	})
	.when('/customers',{
		templateUrl: 'partials/customers.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});

storeApp.factory('StoreFactory', function ($http) {
	var factory = {};
	var customers = [];
	var orders = [];

	factory.getCustomers = function (callback) {
		$http.get('/customers').success(function (output) {
			customers = output;
			callback(customers);
		})
	}

	factory.addCustomer = function (info, callback) {
		$http.post('/addcustomer', info).success(function (output) {
			callback(output);
		})
	}

	factory.deleteCustomer = function (info, callback) {
		$http.post('/deletecustomer', {id: info}).success(function () {
			callback();
		})
	}

	factory.getOrders = function (callback) {
		$http.get('/orders').success(function (output) {
			orders = output;
			callback(orders);
		})
	}

	factory.getProducts = function (callback) {
		$http.get('/products').success(function (output) {
			products = output;
			callback(products);
		})
	}

	factory.addProduct = function (info, callback) {
		$http.post('/addproduct', info).success(function (output) {
			callback(output);
		})
	}

	factory.addOrder = function (info, callback) {
		$http.post('/addorder', info).success(function (output) {
			callback(output);
		})
	}

	return factory;
})

storeApp.controller('dashboardController', function ($scope, StoreFactory) {
	$scope.customers = [];
	$scope.orders = [];
	$scope.products = [];
	$scope.quantity = 4;

	StoreFactory.getOrders(function (data) {
		$scope.orders = data.slice(0,3);
		for (order in $scope.orders) {
			var timediff = (new Date()) - new Date($scope.orders[order].date);
			var interval = $scope.millisecondsToString(timediff);
			$scope.orders[order].interval = interval;
		}
	})

	StoreFactory.getCustomers(function (data) {
		$scope.customers = data.slice(0,3);
		for (cust in $scope.customers) {
			var timediff = (new Date()) - new Date($scope.customers[cust].date);
			var interval = $scope.millisecondsToString(timediff);
			$scope.customers[cust].interval = interval;
		}
	})

	$scope.millisecondsToString = function(milliseconds) {
		var oneDay = 86400000;
		var oneHour = 3600000;
		var oneMinute = 60000;
		var oneSecond = 1000;

		if(milliseconds >= oneDay) {
			return Math.floor(milliseconds/oneDay) + " day(s) ago";
		}
		else if(milliseconds >= oneHour) {
			return Math.floor(milliseconds/oneHour) + " hour(s) ago";
		}
		else if(milliseconds >= oneMinute) {
			return Math.floor(milliseconds/oneMinute) + " minute(s) ago";
		}
		else {
			return Math.floor(milliseconds/oneSecond) + " second(s) ago";
		}
	}

	StoreFactory.getProducts(function (data) {
		$scope.products = data;
	})

	$scope.showMore = function()
	{
		$scope.quantity += 4;
	}
})

storeApp.controller('customerController', function ($scope, StoreFactory) {
	$scope.customers = [];
	$scope.errorMessage = "";

	StoreFactory.getCustomers(function (data) {
		$scope.customers = data;
	})

	$scope.addCustomer = function(customer) {
		var found = false;
		for (newcustomer in $scope.customers) {
			if($scope.customers[newcustomer].name == $scope.customer.name) {
				found = true;
			}
		}
		if (found) {
			$scope.errorMessage = 'Cannot add a customer that is already in the database';
		}
		else {
			$scope.errorMessage = "";
			StoreFactory.addCustomer(customer, function (data){
				$scope.customers.push(data);
				$scope.customer = {};
			})
		}
	}

	$scope.deleteCustomer = function(customer) {
		StoreFactory.deleteCustomer(customer._id, function () {
			console.log($scope.customers.indexOf(customer));
			$scope.customers.splice($scope.customers.indexOf(customer), 1);
		})
	}
})

storeApp.controller('orderController', function ($scope, StoreFactory) {
	$scope.orders = [];
	$scope.customers = [];
	$scope.products = [];
	$scope.maxquantity = 0;

	StoreFactory.getOrders(function (data) {
		$scope.orders = data;
	})

	StoreFactory.getCustomers(function (data) {
		$scope.customers = data;
	})

	StoreFactory.getProducts(function (data) {
		$scope.products = data;
	})

	$scope.change = function (product) {
		for(p in $scope.products) {
			if($scope.products[p]==product) {
				$scope.maxquantity = $scope.products[p].init_quantity;
			}
		}
	}

	$scope.addOrder = function (order) {
		StoreFactory.addOrder(order, function (data) {
			$scope.orders.push(data);
			for(p in $scope.products) {
				if($scope.products[p].name == data.product) {
					$scope.products[p].init_quantity -= data.quantity;
				}
			}
			$scope.order = {};
		})
	}
})

storeApp.controller('productController', function ($scope, StoreFactory) {
	$scope.products = [];
	$scope.quantity = 12;

	StoreFactory.getProducts(function (data) {
		$scope.products = data;
	})

	$scope.addProduct = function (product) {
		StoreFactory.addProduct(product, function (data) {
			$scope.products.push(data);
			$scope.product = {};
		})
	}

	$scope.showMore = function()
	{
		$scope.quantity += 12;
	}
})