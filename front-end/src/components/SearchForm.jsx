import React, { useState } from "react";
import "./SearchForm.css";
const SearchForm = ({ setRecipes, setError }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch("http://localhost:5000/api/recipes/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to fetch recipes");
      }

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setRecipes(data);
      } else {
        setError("No recipes found for this query");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <h1 className="search-title">Recipe Finder</h1>

        <input
          type="text"
          placeholder="Enter a food name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          required
        />

        <button type="submit" disabled={loading} className="search-button">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="search-info">
        {loading && <p className="loading-text">Searching for recipes...</p>}
      </div>
    </div>
  );
};

export default SearchForm;
