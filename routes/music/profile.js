const express = require('express');
const router = express.Router();
const User = require('../../models/user');

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) res.redirect('/'); // if not logged in / authenticated
  else next(); // if logged in / authenticated
};

router.get('/:username', checkIfAuthenticated, (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .then((user) => {
      res.render('profile', { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/:username', (req, res, next) => {
  const { username } = req.params;
  User.findOneAndDelete({ username })
    .then(() => {
      console.log(req.query);

      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
