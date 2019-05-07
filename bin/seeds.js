const SpotifyManager = require('../public/javascripts/spotifyManager');
const mongoose = require('mongoose');
const manager = new SpotifyManager();
const Song = require('../models/song');

const getsongs = async () => {
  await mongoose.connect(`mongodb://localhost/music-test`, { useNewUrlParser: true });

  await manager.init();

  manager.getSongsForPlaylist('1sm4V7pZ9LmPyENFLLu38r')
    .then((result) => {
      result.forEach((song) => {
      // const { name, uri } = song;
        const uri = song.uri;
        const name = song.title;
        Song.findOne({ name })
          .then((song) => {
            if (song !== null) { // checking if song already exists on the db
              return; // exits findOne promise, jumps to next song
            }

            let newSong = new Song();
            newSong.title = name || 'Unknown';
            newSong.spotifyId = uri.split(':')[2] || 'NoId'; // want to get the 3rd parameter of a string, separated by ":" to append it to spotify embed
            // newSong.genre = genre id
            newSong.rating = 1500;

            newSong.save((err) => {
              if (err) console.log(err);
              else console.log('new song' + newSong);
            });
          })
          .catch(error => console.log('heep' + error));
      });
    })
    .catch(error => console.log('last' + error));
};

getsongs();
