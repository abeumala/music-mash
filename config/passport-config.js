const passport = require('passport');
const User = require('../models/user');

// ( this happens when user logs in successfully)
passport.serializeUser((userObj, done) => {
  done(null, userObj._id);
  // null as the first argument means NO ERRORS OCCURRED
  // done() sends the `id` to next step to be set on the cookie
});

passport.deserializeUser((idFromCookie, done) => {
  User.findById(idFromCookie)
    .then((userObj) => {
      done(null, userObj);
    })
    .catch((err) => done(err));
});

module.exports = passport;
