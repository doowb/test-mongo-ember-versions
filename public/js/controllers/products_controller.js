Products.ProductsController = Ember.ArrayController.extend({
	actions: {
		createProduct: function () {
			var title = this.get('newTitle');
			if (!title.trim()) {
				return;
			}

			var product = this.store.createRecord('product', {
				title: title,
				isActive: false
			});

			this.set('newTitle', '');

			product.save();
		}
	}
});