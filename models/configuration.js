(function (exports) {

  var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,

    ConfigurationSchema = new mongoose.Schema({
      name: {
        'type': String
      },
      doc: {}
    });

  ConfigurationSchema.statics.findByName = function (name, cb) {
    this.find({
      name: new RegExp(name, 'i')
    }, cb);
  };

  exports = mongoose.model('Configuration', ConfigurationSchema);

}(module.exports));