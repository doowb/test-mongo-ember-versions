(function (exports) {

  var mongoose = require('mongoose'),
    version = require('mongoose-version'),
    ObjectId = mongoose.Schema.Types.ObjectId,

    ProductSchema = new mongoose.Schema({
      title: {
        'type': String,
        'default': 'New Product'
      },
      // description: {
      //   'type': String,
      //   'default': 'New Product Description'
      // },
      // version: {
      //   'type': Number,
      //   'default': 0
      // },
      // released: {
      //   'type': Date,
      //   'default': Date.now
      // },
      // lastUpdated: {
      //   'type': Date,
      //   'default': Date.now
      // },
      // size: {
      //   'type': Number,
      //   'default': 0
      // },
      // views: {
      //   'type': Number,
      //   'default': 0
      // },
      // purchases: {
      //   'type': Number,
      //   'default': 0
      // },
      isActive: {
        'type': Boolean,
        'default': true
      }
    });

  ProductSchema.plugin(version, {
    collection: 'product_versions',
    suppressVersionIncrement: false,
    strategy: 'collection',
    mongoose: mongoose,
    logError: true
  });

  exports = mongoose.model('Product', ProductSchema);

}(module.exports));