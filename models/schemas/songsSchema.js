const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songsSchema = new Schema ({
    name: String,
    artist: String,
    song_url: String
})

module.exports = songsSchema;