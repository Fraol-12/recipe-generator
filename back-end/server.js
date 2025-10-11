const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());



app.get('/api/test', (req, res) => {
  res.send('Hello mf!');
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlparser: true,
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