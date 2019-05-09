const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passportRouter = require('./music/passportRouter');
const rankRouter = require('./music/rank');
const voteRouter = require('./music/vote');
const profileRouter = require('./music/profile');
router.use('/rank', rankRouter);
router.use('/profile', profileRouter);

router.use('/vote', voteRouter);

router.use('/', passportRouter);

router.get('/', (req, res, next) => {
  if (!req.user) res.render('index', { title: 'Express' });
  else {
    const { _id } = req.user._id;
    User.findOne({ _id })
      .then((user) => {
        res.render('index', { user });
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
