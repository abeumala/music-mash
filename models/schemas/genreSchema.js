const mongoose = require('mongoose');
const songsSchema = require('../schemas/songsSchema')
const Schema = mongoose.Schema;

const genreSchema = new Schema ({
    name: String,
    songs: [songsSchema],

})

module.exports = genreSchema;