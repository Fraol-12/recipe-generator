const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');


app.use(cors());
app.use(express.json());



app.get('/api/test', (req, res) => {
  res.send('Hello mf!');
});


app.post('/api/recipes/search', async (req, res) => {
    try {
        const query = req.body.query;

        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
    }
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                query: query,
                number: 10,
            },
        }
    );
    

    // Check if response has results
    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ message: 'No recipes found' });
    }

    // Extract only useful fields
    const formattedResults = response.data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
    }));

    // Send simplified results
    res.json(formattedResults);

  } catch (error) {
    console.error('Error fetching recipes:', error.message);

    if (error.response && error.response.status === 402) {
      // 402 = free tier limit exceeded on Spoonacular
      return res.status(429).json({ message: 'API request limit reached. Try again later.' });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('MognoDB Connection Error:', err.message);
        process.exit(1);
    }
};

connectDB();


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});