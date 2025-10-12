
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import RecipeList from "./components/RecipeList";
import Favorites from "./components/Favorites";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchForm setRecipes={setRecipes} setError={setError} />
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              <RecipeList recipes={recipes} />
            </>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
