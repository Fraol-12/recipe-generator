import React, { useState } from "react";

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
        setRecipes(data); // ✅ update App state
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
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">🍳 Recipe Finder</h1>

      <input
        type="text"
        placeholder="Enter a food name (e.g., pasta)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;
