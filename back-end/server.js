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
    
    res.json(response.data.results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fethching recipes'});

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