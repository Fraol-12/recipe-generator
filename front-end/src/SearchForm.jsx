import React, { useState } from "react";

const SearchForm = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload
    console.log("Searching for:", query);
    // 🔜 Later you’ll add fetch(`/api/recipes/search?query=${query}`)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          🍳 Recipe Finder
        </h1>

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
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
