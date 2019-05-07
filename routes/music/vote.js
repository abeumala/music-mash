const express = require('express');
const router = express.Router();
// const User = require('../../models/user');
const Song = require('../../models/song');
const SpotifyManager = require('../../public/javascripts/spotifyManager');
const manager = new SpotifyManager();

const Elo = require('../../public/javascripts/eloRanking');
let newElo = new Elo();

manager.init();

// Custom middleware to check if user is logged in
const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) res.redirect('/'); // if not logged in / authenticated
  else next(); // if logged in / authenticated
};

router.get('/', checkIfAuthenticated, async (req, res, next) => {
  let firstSong;
  let secondSong;
  let songsArr = await Song.find();
  console.log(songsArr.length);
  let randomIndex = Math.floor(Math.random() * songsArr.length); // check songs length
  console.log('hello michelle');
  console.log(randomIndex);
  let idLeft = req.query.firstSong;
  let idRight = req.query.secondSong;
  var renderSongs = () => {
    firstSong = songsArr[randomIndex];
    let rating = firstSong.rating;
    let maxRating = rating + 50;
    let minRating = rating - 50;
    Song.findOne({ $and: [{ rating: { $gte: minRating } }, { rating: { $lte: maxRating } }, { title: { $ne: firstSong.name } }] })
      .then((result) => {
        secondSong = result;
        console.log(firstSong, secondSong);
        res.render('vote', { songs: [firstSong, secondSong] });
      });
  };
  if (Object.keys(req.query).length === 0) {
    console.log('inside id length');

    renderSongs();
  } else {
    if (idLeft) {
      newElo.winA = true;
      newElo.winB = false;
      newElo.setRanking();
    } else if (idRight) {
      newElo.winA = false;
      newElo.winB = true;
      newElo.setRanking();
    }
    renderSongs();
  }
});

module.exports = router;
