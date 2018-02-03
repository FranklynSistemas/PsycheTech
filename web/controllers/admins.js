const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
require('../models/admins')
const Admins = mongoose.model('admins')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    Admins.findOne({
      email: email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));


exports.login = (req, res, next) => {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/administrator');
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
  
    const newAdmin = req.body
    const admin = await new Admins(newAdmin).save()
    console.log(admin);
    res.json({
      status: true,
      info: "admin created success"
    })

  
}
