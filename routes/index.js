const express = require('express');
const router = express.Router();
const loginRouter = require('./music/login')
const rankRouter = require('./music/rank')
const signupRouter = require('./music/signup')
const voteRouter = require('./music/vote')

router.use('/login', loginRouter)
router.use('/rank', rankRouter)
router.use('/signup', signupRouter)
router.use('/vote', voteRouter)

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});



module.exports = router;
