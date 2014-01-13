window.Products = Ember.Application.create();

DS.JSONSerializer.reopen({
	primaryKey: '_id'
});

DS.RESTAdapter.reopen({
	namespace: 'api'
});

//Ember.Inflector.inflector.irregular('product', 'product');

//Products.ApplicationAdapter = DS.FixtureAdapter.extend();
// Products.ApplicationAdapter = DS.LSAdapter.extend({
// 	namespace: 'products-emberjs'
// });