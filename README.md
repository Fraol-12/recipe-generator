🍳 Recipe Finder App

A full-stack Recipe Finder application built with MERN stack (MongoDB, Express, React, Node.js). Search recipes, view detailed steps, copy instructions, share recipes, and save your favorites.

🛠 Features

Search recipes by name using the Spoonacular API.

View full recipe details: ingredients, instructions, and nutrition info.

Copy recipe to clipboard for easy reference.

Share recipe link with others.

Save and toggle favorites (❤️ / 🤍).

Smooth UI with responsive design.

📦 Tech Stack

Frontend: React.js, CSS (or Tailwind if configured)

Backend: Node.js, Express

Database: MongoDB (for favorites)

API: Spoonacular API

⚡ Installation
1. Clone the repository
git clone https://github.com/yourusername/recipe-finder.git
cd recipe-finder

2. Setup Backend
cd backend
npm install


Create a .env file in /backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
SPOONACULAR_API_KEY=your_api_key


Run the backend:

npm run dev


Backend runs on http://localhost:5000.

3. Setup Frontend
cd ../front-end
npm install
npm run dev


Frontend runs on http://localhost:5173 (Vite default).

🖥 Usage

Open the app in your browser.

Enter a food name in the search bar (e.g., "pasta") and click Search.

Browse recipes displayed in a grid.

Click View Steps to see ingredients, instructions, and nutrition.

Click ❤️ Favorite to save the recipe (click again to unfavorite).

Click Copy to copy recipe instructions to clipboard.

Click Share to copy a recipe link.

🗂 Folder Structure
Recipe-Finder/
├── backend/              # Express server
│   ├── routes/           # API routes
│   ├── models/           # MongoDB models
│   ├── server.js         # Entry point
│   └── .env
├── front-end/            # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md

💻 Screenshots

Search Recipes:


Recipe Details:


Favorites:


⚠️ Notes

The app uses Spoonacular free API. You might hit the free daily request limit.

Make sure your MongoDB is running for favorites to work.

For production, consider hosting backend and frontend on platforms like Heroku/Vercel and using environment variables.

🔗 Links

Spoonacular API: https://spoonacular.com/food-api

MongoDB Atlas: https://www.mongodb.com/cloud/atlas