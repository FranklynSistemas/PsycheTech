const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const Admins = require('../models/admins')

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    Admins.findOne({
      email: email
    }, function(err, user) {
      console.log(err, user)
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      user.validPassword(password, (valid) => {
        if (!valid) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        console.log("valid", valid)
        return done(null, user);
      })

    });
  }
));


exports.login = (req, res, next) => {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/administrator/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({status: true});
    });
  })(req, res, next);
}

/* Create New Admin
	
	{
		name: 'Franklyn',
		email: 'franking.sis@correo.com',
		password: 'mySurePass'
	}

 */

exports.createAdmin = async(req, res, next) => {
  try {
    const newAdmin = req.body
    const admin = await new Admins(newAdmin).save()
    res.json({
      status: true,
      info: "admin created success"
    })
  } catch (error) {
    res.json({
      status: false,
      info: "error created admin"
    })
  }



}
