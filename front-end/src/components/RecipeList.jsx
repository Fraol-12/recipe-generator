import React, { useState } from 'react';
import axios from 'axios';

const RecipeList = ({ recipes }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [modalRecipe, setModalRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite
  const handleToggleFavorite = async (recipe) => {
    const isFavorited = favorites.includes(recipe.id);
    if (!isFavorited) {
      try {
        await axios.post('http://localhost:5000/api/favorites', {
          recipeId: recipe.id,
          recipeData: recipe,
        });
        setFavorites(prev => [...prev, recipe.id]);
      } catch (err) {
        console.error(err);
        alert('Failed to save favorite');
      }
    } else {
      setFavorites(prev => prev.filter(id => id !== recipe.id));
    }
  };

  // Copy recipe instructions
  const handleCopy = (recipe) => {
    const ingredients = recipe.extendedIngredients
      ? recipe.extendedIngredients.map(i => `- ${i.original}`).join('\n')
      : 'No ingredients available';
    const instructions = recipe.instructions || 'No instructions available';
    const text = `Recipe: ${recipe.title}\n\nIngredients:\n${ingredients}\n\nInstructions:\n${instructions}`;

    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(recipe.id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch(err => console.error(err));
  };

  // Share recipe (copy a URL)
  const handleShare = (recipe) => {
    const shareUrl = `${window.location.origin}/recipe/${recipe.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('Recipe link copied!'))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      {recipes.map(recipe => {
        const isFavorited = favorites.includes(recipe.id);

        return (
          <div key={recipe.id} style={{ background: '#fff', borderRadius: '12px', padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
            <h3 style={{ margin: '10px 0' }}>{recipe.title}</h3>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
              <button
                onClick={() => handleToggleFavorite(recipe)}
                style={{
                  background: isFavorited ? '#ff4b5c' : '#fff',
                  color: isFavorited ? '#fff' : '#ff4b5c',
                  border: '2px solid #ff4b5c',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {isFavorited ? '❤️ Favorite' : '🤍 Favorite'}
              </button>

              <button onClick={() => handleCopy(recipe)} style={{ background: '#007bff', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}>
                {copiedId === recipe.id ? 'Copied!' : 'Copy'}
              </button>

              <button onClick={() => handleShare(recipe)} style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}>
                Share
              </button>

              <button onClick={() => setModalRecipe(recipe)} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}>
                View Steps
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal */}
      {modalRecipe && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', width: '90%', maxWidth: '500px', maxHeight: '80%', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '10px' }}>{modalRecipe.title}</h2>

            <h3>Ingredients:</h3>
            <ul>
              {modalRecipe.extendedIngredients
                ? modalRecipe.extendedIngredients.map(i => <li key={i.id}>{i.original}</li>)
                : <li>Not available</li>}
            </ul>

            <h3>Instructions:</h3>
            <p>{modalRecipe.instructions || 'Not available'}</p>

            {/* Nutritional Highlights */}
            {modalRecipe.nutrition?.nutrients && (
              <div style={{ marginTop: '10px' }}>
                <h4>Nutrition:</h4>
                <ul>
                  {modalRecipe.nutrition.nutrients.slice(0, 5).map(n => (
                    <li key={n.name}>{n.name}: {n.amount} {n.unit}</li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={() => setModalRecipe(null)} style={{ marginTop: '15px', padding: '8px 12px', background: '#ff4b5c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
