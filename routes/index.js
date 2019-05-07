const express = require('express');
const router = express.Router();

const passportRouter = require('./music/passportRouter');
const rankRouter = require('./music/rank');
const voteRouter = require('./music/vote');
const profileRouter = require('./music/profile');
router.use('/rank', rankRouter);
router.use('/profile', profileRouter);

router.use('/vote', voteRouter);

router.use('/', passportRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
