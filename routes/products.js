(function (exports) {

	var mongoose = require('mongoose'),
		crud = require('./crud'),
		Product = mongoose.model('Product'),
		extend = require('node.extend');

	exports.init = function (app) {

		crud.initRoutesForModel({
			'app': app,
			'model': Product
		});

	};

}(module.exports));