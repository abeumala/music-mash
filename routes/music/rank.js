const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/', (req, res, next) => {
  res.render('ranking');
});
module.exports = router;
