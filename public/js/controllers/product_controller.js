Products.ProductController = Ember.ObjectController.extend({

	actions: {
		editProduct: function () {
			console.log('editProduct clicked');
			this.set('isEditing', true);
		},

		removeProduct: function () {
			var product = this.get('model');
			product.deleteRecord();
			product.save();
		}
	},

	isActive: function (key, value) {
		var model = this.get('model');

		if (value === undefined) {
			return model.get('isActive');
		} else {
			model.set('isActive', value);
			model.save();
			return value;
		}
	}.property('model.isActive'),

	isEditing: false

});