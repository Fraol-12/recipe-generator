// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: 'defaultUser', // temporary until you add authentication
  },
  recipeData: {
    type: Object,
    required: true, // store full recipe info for offline access
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
