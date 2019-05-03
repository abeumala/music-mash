const mongoose = require('mongoose');
const songsSchema = require('../models/schemas/songsSchema');
const Song = mongoose.model('Song', songsSchema);



module.exports = Song;