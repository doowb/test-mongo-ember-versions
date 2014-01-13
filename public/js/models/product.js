Products.Product = DS.Model.extend({
	title: DS.attr('string'),
	isActive: DS.attr('boolean')
});

Products.Product.FIXTURES = [
	{
		id: 1,
		title: 'Hero 3+',
		isActive: true
	},

	{
		id: 2,
		title: 'Hero 3',
		isActive: false
	},

	{
		id: 3,
		title: 'Cannon',
		isActive: false
	}
];