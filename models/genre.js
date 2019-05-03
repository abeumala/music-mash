const mongoose = require('mongoose');
const genreSchema = require('../models/schemas/genreSchema');
const Genre = mongoose.model('Genre', genreSchema);



module.exports = Genre;