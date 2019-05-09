const express = require('express');
const router = express.Router();
const User = require('../../models/user');

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) res.redirect('/'); // if not logged in / authenticated
  else next(); // if logged in / authenticated
};

router.get('/', checkIfAuthenticated, (req, res, next) => {
  const { _id } = req.user._id;
  User.find({ _id })
    .then((user) => {
      console.log(user);
      res.render('profile', { user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res, next) => {
  const { _id } = req.user._id;
  console.log(_id);
  User.findByIdAndDelete({ _id })
    .then(() => {
      console.log(_id);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
