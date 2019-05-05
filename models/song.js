const mongoose = require('mongoose');
const songSchema = require('../models/schemas/songSchema');
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
