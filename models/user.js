(function (exports) {

  var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    extend = require('node.extend'),
    passport = require('passport'),
    passportLocal = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),

    UserSchema = new mongoose.Schema({

      firstName: {
        'type': String
      },
      lastName: {
        'type': String
      },
      email: {
        'type': String,
        unique: true
      },
      salt: {
        'type': String,
        required: true
      },
      hash: {
        'type': String,
        required: true
      },
      profileName: {
        'type': String
      },

      socialInfo: [
        {
          socialType: {
            'type': String,
            'default': 'Twitter'
          },
          userName: {
            'type': String
          },
          url: {
            'type': String
          }
          }
        ]
    });

  UserSchema.virtual('password')
    .get(function () {
      return this._password;
    })
    .set(function (password) {
      this._password = password;
      var salt = this.salt = bcrypt.genSaltSync(10);
      this.hash = bcrypt.hashSync(password, salt);
    });

  UserSchema.method('verifyPassword', function (password, callback) {
    bcrypt.compare(password, this.hash, callback);
  });

  UserSchema.static('authenticate', function (email, password, callback) {
    this.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false);
      }
      user.verifyPassword(password, function (err, passwordCorrect) {
        if (err) {
          return callback(err);
        }
        if (!passwordCorrect) {
          return callback(null, false);
        }
        return callback(null, user);
      });
    });
  });

  var User;
  exports = User = mongoose.model('User', UserSchema);

  passport.use(new passportLocal({
      usernameField: 'email'
    },
    function (email, password, done) {
      User.authenticate(email, password, function (err, user) {
        return done(err, user);
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

}(module.exports));