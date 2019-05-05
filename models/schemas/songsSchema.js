const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema({
  title: String,
  spotifyId: String,
  rating: Number
});

module.exports = songsSchema;
