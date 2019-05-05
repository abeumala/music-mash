// everything regarding auth operations (login / signup)
// need to add route for restricted content here!
const express = require('express');
const router = express.Router();
// Require user model
const User = require('../../models/user');
// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
// Add passport
const passport = require('passport');
// const ensureLogin = require('connect-ensure-login');

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('signup', { message: 'Indicate username and password' }); //
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        res.render('signup', { message: 'The username already exists' });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPassword = bcrypt.hashSync(password, salt);

      const newUser = new User({ username, password: hashPassword });

      newUser.save((err) => {
        if (err) {
          res.render('signup', { message: 'Something went wrong' });
        } else {
          res.redirect('/vote');
        }
      });
    })
    .catch((err) => console.log(err));
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/vote',
  failureRedirect: '/login',
  passReqToCallback: true
}));

module.exports = router;
