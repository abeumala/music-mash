const express = require('express');
const router = express.Router();
const passportRouter = require('./passportRouter');
// const User = require('../../models/user');
const Song = require('../../models/songs');
const SpotifyManager = require('../../public/javascripts/spotifyManager');
const manager = new SpotifyManager();
let firstSong;
let secondSong;

manager.init();
router.use('/', passportRouter);

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
      result.forEach((song) => {
        const { name, uri } = song;

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
  Song.aggregate([{ $sample: { size: 1 } }])
    .then((songs) => {
      firstSong = songs[0];
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
});

module.exports = router;
