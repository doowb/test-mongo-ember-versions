/**
 * Very basic CRUD route creation utility for models.
 * For validation, simply override the model's save method.
 */

(function (exports) {
  "use strict";

  function errMsg(msg) {
    return {
      'error': {
        'message': msg.toString()
      }
    };
  }

  //---------------------------
  // List
  //
  function getListController(model) {
    return function (req, res) {
      model.find({}, function (err, result) {
        if (!err) {
          if (!result) result = [];
          var json = {};
          json[model.modelName.toLowerCase() + 's'] = result
          res.send(json);
        } else {
          res.send(errMsg(err));
        }
      });
    };
  }

  //-----------------------------
  // Create
  //
  function getCreateController(model) {
    return function (req, res) {
      var m = new model(req.body[model.modelName.toLowerCase()]);
      m.save(function (err) {
        if (!err) {
          var json = {};
          json[model.modelName.toLowerCase()] = m;
          res.send(json);
        } else {
          res.send(errMsg(err));
        }
      });
    };
  }

  //----------------------------
  // Read
  //
  function getReadController(model) {
    return function (req, res) {
      model.findById(req.params.id, function (err, result) {
        if (!err) {
          var json = {};
          json[model.modelName.toLowerCase()] = result;
          res.send(json);
        } else {
          res.send(errMsg(err));
        }
      });
    };
  }

  //-------------------------------
  // Update
  //
  function getUpdateController(model) {
    return function (req, res) {
      model.findById(req.params.id, function (err, result) {
        var key;
        var update = req.body[model.modelName.toLowerCase()];
        for (key in update) {
          result[key] = update[key];
        }
        result.save(function (err) {
          if (!err) {
            var json = {};
            json[model.modelName.toLowerCase()] = result;
            res.send(json);
          } else {
            res.send(errMsg(err));
          }
        });
      });
    };
  }

  //-------------------------------
  // Delete
  //
  function getDeleteController(model) {
    return function (req, res) {
      model.findById(req.params.id, function (err, result) {
        if (err) {
          res.send(errMsg(err));
        } else {
          result.remove();
          result.save(function (err) {
            if (!err) {
              res.send({});
            } else {
              res.send(errMsg(err));
            }
          });
        }
      });
    };
  }

  exports.initRoutesForModel = function (options) {
    var app = options.app,
      model = options.model,
      path,
      pathWithId;

    if (!app || !model) {
      return;
    }

    path = options.path || '/api/' + model.modelName.toLowerCase() + 's';
    pathWithId = path + '/:id';

    app.get(path, getListController(model));
    app.post(path, getCreateController(model));
    app.get(pathWithId, getReadController(model));
    app.put(pathWithId, getUpdateController(model));
    app.del(pathWithId, getDeleteController(model));
  };

}(exports));