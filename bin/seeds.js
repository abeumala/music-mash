const SpotifyManager = require('../public/javascripts/spotifyManager');
const mongoose = require('mongoose');
const manager = new SpotifyManager();
const Song = require('../models/song');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const getsongs = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

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
            const rating = Math.floor(Math.random() * (1900 - 1400 + 1)) + 1400;
            console.log('new rating', rating);

            const newSong = new Song({ title, spotifyId, rating });

            return newSong.save((err) => {
              if (err) console.log(err);
            });
          })
          .catch(error => console.log('heep' + error));
      });
    })
    .catch(error => console.log('last' + error));
};

getsongs();
