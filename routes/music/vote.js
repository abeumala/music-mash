const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Song = require('../../models/song');
const SpotifyManager = require('../../public/javascripts/spotifyManager');
const manager = new SpotifyManager();
let firstSong;
let secondSong;

const Elo = require('../../public/javascripts/eloRanking');
let newElo = new Elo();

manager.init();

// Custom middleware to check if user is logged in
const checkIfAuthenticated = (req, res, next) => {
  if (!req.user) res.redirect('/signup'); // if not logged in / authenticated
  else next(); // if logged in / authenticated
};

router.get('/', checkIfAuthenticated, async (req, res, next) => {
  let songsArr = await Song.find();
  console.log(req.query);
  var renderSongs = () => {
    let randomIndex = Math.floor(Math.random() * (songsArr.length - 1));
    firstSong = songsArr[randomIndex];
    let firstSongRating = Math.floor(firstSong.rating);
    let maxRating = firstSongRating + 50;
    let minRating = firstSongRating - 50;
    Song.find({ $and: [{ rating: { $gte: minRating } }, { rating: { $lte: maxRating } }, { title: { $ne: firstSong.title } }] })
      .then((result) => {
        let randomIndex1 = Math.floor(Math.random() * (result.length - 1));
        console.log(result);
        secondSong = result[randomIndex1];
        console.log(secondSong);
        res.render('vote', { songs: [firstSong, secondSong] });
      })
      .catch((err) => console.log(err));
  };
  if (Object.keys(req.query).length === 0) {
    console.log('inside id length');

    renderSongs();
  } else {
    if (req.query.idFirstLeft && req.query.idFirstRight) {
      let songAId = req.query.idFirstLeft;
      let songBId = req.query.idFirstRight;
      console.log('first won');
      newElo.winA = true;
      newElo.winB = false;
      newElo.setRanking(firstSong.rating, secondSong.rating, songAId, songBId);
      renderSongs();
    } else if (req.query.idSecondLeft && req.query.idSecondRight) {
      let songBId = req.query.idSecondLeft;
      let songAId = req.query.idSecondRight;
      console.log('second won');
      newElo.winA = false;
      newElo.winB = true;
      newElo.setRanking(firstSong.rating, secondSong.rating, songAId, songBId);
      renderSongs();
    }
  }
});

module.exports = router;
