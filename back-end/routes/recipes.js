const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/search', async (req, res) => {
  try {
    const query = req.body.query;
    if (!query) return res.status(400).json({ message: 'Query is required' });

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          query: query,
          number: 3,
        },
      }
    );

    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ message: 'No recipes found' });
    }

    const formattedResults = response.data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      
    }));

    res.json(formattedResults);
 } catch (error) {
  console.error('Error fetching recipes:', error.response?.data || error.message || error);
  if (error.response && error.response.status === 402) {
    return res.status(429).json({ message: 'API request limit reached. Try again later.' });
  }
  res.status(500).json({ message: 'Server error. Please try again later.' });
}

});

router.get('/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          includeNutrition: true, // get nutrition info too
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe details:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch recipe details.' });
  }
});


module.exports = router;
