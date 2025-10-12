// src/components/Favorites.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="favorites-list">
      <h2>⭐ My Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        favorites.map((fav) => (
          <div key={fav._id} className="recipe-card">
            <img src={fav.recipeData.image} alt={fav.recipeData.title} />
            <h3>{fav.recipeData.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
