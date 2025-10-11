import React, { useState } from "react";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch("/api/recipes/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      // Check if backend returned error status
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to fetch recipes");
      }

      const data = await res.json();
      console.log("Raw response from backend:", data);

      // Ensure data is an array
      if (Array.isArray(data) && data.length > 0) {
        setRecipes(data);
      } else {
        setError("No recipes found for this query");
      }
    } catch (err) {
      console.error("❌ Error:", err.message);
      setError(err.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
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
          disabled={loading}
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results / Error Section */}
      <div className="mt-8 w-full max-w-2xl">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {recipes.map((r) => (
              <div
                key={r.id}
                className="bg-white shadow-md rounded-xl overflow-hidden"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-40 object-cover"
                />
                <p className="p-3 font-medium text-gray-800">{r.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
