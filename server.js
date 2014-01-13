/*********************************************************
 * main application server
 * This server will take requests for all static
 * files and any restful api calls needed
 **********************************************************/
module.exports = (function () {

  var express = require('express'),
    http = require('http'),
    hbs = require('hbs'),
    dbConfig = require('./config/credentials'),

    mongoose = require('mongoose'),
    passport = require('passport'),
    models = require('./models'),
    routes = require('./routes'),
    app = express();

  app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
      secret: 'omedbwood'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function () {
    app.use(express.errorHandler());
  });

  routes.init(app);

  var env = 'dev';
  mongoose.connect(dbConfig[env].url);

  var port = process.env.PORT || 3000
  var server = http.createServer(app).listen(port);

  console.log("Application Server running on port " + port);

})();