// routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// POST: Save a favorite recipe
router.post('/', async (req, res) => {
  try {
    const { recipeId, recipeData } = req.body;

    if (!recipeId || !recipeData) {
      return res.status(400).json({ message: 'recipeId and recipeData are required' });
    }

    const newFavorite = new Favorite({
      recipeId,
      recipeData,
      userId: 'defaultUser',
    });

    await newFavorite.save();
    res.status(201).json({ message: 'Recipe saved as favorite', favorite: newFavorite });
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: List all favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: 'defaultUser' });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
