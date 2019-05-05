const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: String,
  spotifyId: String,
  rating: Number
});

module.exports = songSchema;
