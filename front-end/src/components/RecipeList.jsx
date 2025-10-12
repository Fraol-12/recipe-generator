import React from 'react';
import axios from 'axios';

const RecipeList = ({ recipes }) => {
  const handleSaveToFavorites = async (recipe) => {
    try {
      await axios.post('http://localhost:5000/api/favorites', {
        recipeId: recipe.id,
        recipeData: recipe,
      });
      alert(`${recipe.title} saved to favorites!`);
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Failed to save favorite');
    }
  };

  if (!recipes || recipes.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>No recipes found. Try searching something!</p>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
          />
          <h3 style={{ margin: '10px 0' }}>{recipe.title}</h3>
          <button 
            onClick={() => handleSaveToFavorites(recipe)}
            style={{
              marginTop: '10px',
              background: '#ff4b5c',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ❤️ Save to Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
