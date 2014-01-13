(function (exports) {
  "use strict";

  var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    Configuration = mongoose.model('Configuration'),

    // load each module
    //pageDataRoutes = require('./pageData'),
    // transactionRoutes = require('./transaction'),
    // configurationRoutes = require('./configuration'),
    productRoutes = require('./products'),
    //componentRoutes = require('./components'),
    // domainRoutes = require('./domains'),
    // githubRoutes = require('./github'),
    //accountRoutes = require('./account'),

    crud = require('./crud'),
    passport = require('passport'),
    User = mongoose.model('User'),
    extend = require('node.extend');

  function index(req, res) {
    //res.render('index');
    fs.createReadStream(path.join(process.cwd(), 'views', 'index.hbs'))
      .pipe(res);
  };

  function getRegister(req, res) {
    res.redirect('/#/register');
  };

  function postRegister(req, res) {
    var newUser = new User({
      email: req.param('email'),
      password: req.param('password')
    });

    newUser.save(function (err) {
      if (err) {
        throw err;
      }
      res.redirect('/');
    });
  };

  function getLogin(req, res) {
    res.redirect('/#/login');
  };

  function postLogout(req, res) {
    req.logout();
    res.redirect('/');
  };

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/#/login');
  };

  exports.init = function (app) {
    app.get('/', index);

    app.get('/register', getRegister);
    app.post('/register', postRegister);

    app.get('/login', getLogin);
    app.post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

    app.post('/logout', postLogout);

    crud.initRoutesForModel({
      'app': app,
      'model': User
    });

    //    pageDataRoutes.init(app);
    // configurationRoutes.init(app);
    productRoutes.init(app);
    // domainRoutes.init(app);
    // githubRoutes.init(app);
    // transactionRoutes.init(app);

  };

}(module.exports));