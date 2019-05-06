const SpotifyManager = require('../public/javascripts/spotifyManager');
const mongoose = require('mongoose');
const config = require('../config/config');
const manager = new SpotifyManager();
const Song = require('../models/song');

mongoose
  .connect(`mongodb://localhost/${config.DB_NAME}`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const getsongs = async () => {
  await manager.init();

  manager.getSongsForPlaylist('1sm4V7pZ9LmPyENFLLu38r')
    .then((result) => {
      // console.log(result);
      result.forEach((song) => {
        const { name, uri } = song;
        return Song.findOne({ title: name })
          .then((song) => {
            const title = name || 'Unknown';
            const spotifyId = uri.split(':')[2] || 'NoId'; // want to get the 3rd parameter of a string, separated by ":" to append it to spotify embed
            const rating = 1500;

            const newSong = new Song({ title, spotifyId, rating });

            return newSong.save((err) => {
              console.log('it worked');
              if (err) console.log(err);
            });
          })
          .catch(error => console.log(error));
      });
    })
    .catch(error => console.log(error));
};

getsongs();