const express = require('express');
const router = express.Router();
// const User = require('../../models/user');
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
  if (!req.user) res.redirect('/'); // if not logged in / authenticated
  else next(); // if logged in / authenticated
};

// GET  '/download-playlist'

router.get('/download-playlist', (req, res, next) => {
  console.log('inside downloads');
  manager.getSongsForPlaylist('1sm4V7pZ9LmPyENFLLu38r')
    .then((result) => {
      console.log('inside manager');
      console.log(result);
      result.forEach((song) => {
        // const { name, uri } = song;
        const uri = song.uri;
        const name = song.title;
        Song.findOne({ name })
          .then((song) => {
            if (song !== null) { // checking if song already exists on the db
              return; // exits findOne promise, jumps to next song
            }

            const newSong = new Song();

            newSong.title = name || 'Unknown';
            newSong.spotifyId = uri.split(':')[2] || 'NoId'; // want to get the 3rd parameter of a string, separated by ":" to append it to spotify embed
            // newSong.genre = genre id
            newSong.rating = 1500;

            newSong.save((err) => {
              if (err) console.log(err);
              else console.log(newSong);
            });
          })
          .catch(error => console.log(error));
      });
      res.send({
        success: true
      });
    })
    .catch(error => console.log(error));
});

router.get('/', checkIfAuthenticated, (req, res, next) => {
  console.log(Song.length);
  // let randomIndex = Math.floor(Math.random() * Song.length);
  // console.log(randomIndex);
  let id = req.query;
  console.log();
  if (id.length === 0) {
    console.log('inside');
    var renderSongs = () => {
      Song.aggregate([{ $sample: { size: 1 } }])
      // Song.findOne([{ spotifyId: Song[randomIndex].spotifyId }])
        .then((song) => {
          firstSong = song;
          let rating = firstSong.rating;
          let maxRating = rating + 50;
          let minRating = rating - 50;
          Song.findOne({ $and: [{ rating: { $gte: minRating } }, { rating: { $lte: maxRating } }, { title: { $ne: firstSong.name } }] })
            .then((result) => {
              secondSong = result;
              res.render('vote', { 'songs': [firstSong, secondSong] });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };
  } else if (id.length > 0) {
    if (id === firstSong.spotifyId) {
      newElo.winA = true;
      newElo.winB = false;
      newElo.setRanking();
    } else if (id === secondSong.spotifyId) {
      newElo.winA = false;
      newElo.winB = true;
      newElo.setRanking();
    }
    renderSongs();
  }
});

module.exports = router;
