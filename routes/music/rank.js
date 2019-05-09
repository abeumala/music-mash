const express = require('express');
const router = express.Router();
const Song = require('../../models/song');

// const User = require('../../models/user');
// const voteRouter = require('./vote');
// const passportRouter = require('./passportRouter');
// router.use('/vote', voteRouter);

// router.use('/', passportRouter);

const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) res.redirect('/'); // if not logged in / authenticated
  else next(); // if logged in / authenticated
};

router.get('/', checkIfAuthenticated, (req, res, next) => {
  // console.log(Song);
  Song.aggregate([{ $sort: { rating: -1 } }, { $limit: 10 }])
    .then((result) => {
      //   console.log('result', { result });
      res.render('ranking', { result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
