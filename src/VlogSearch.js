import React, { useState } from 'react';
import axios from 'axios';

const VlogSearch = () => {
  const [formData, setFormData] = useState({
    username: '',
    destinationName: '',
    minReviewRating: '',
    maxReviewRating: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:4343/VlogSearch/search', formData)
      .then(response => {
        console.log(response.data);
        setSearchResults(response.data.vlogs);
      })
      .catch(error => {
        console.error('Error fetching vlogs:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Vlog Search</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="destinationName" className="block text-sm font-medium text-gray-700">Destination Name:</label>
            <input
              type="text"
              id="destinationName"
              name="destinationName"
              value={formData.destinationName}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="minReviewRating" className="block text-sm font-medium text-gray-700">Min Review Rating:</label>
            <input
              type="number"
              id="minReviewRating"
              name="minReviewRating"
              value={formData.minReviewRating}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="maxReviewRating" className="block text-sm font-medium text-gray-700">Max Review Rating:</label>
            <input
              type="number"
              id="maxReviewRating"
              name="maxReviewRating"
              value={formData.maxReviewRating}
              onChange={handleInputChange}
              className="border border-gray-300 px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="md:col-span-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-full"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>
      {searchResults.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Search Results</h3>
          <ul>
            {searchResults.map((vlog, index) => (
              <li key={index} className="border p-4 mb-4 rounded-md">
                <p className="text-lg font-semibold">Username: {vlog.username}</p>
                <p className="mb-2">Destination Name: {vlog.destinationName}</p>
                <p className="mb-2">Rating: {vlog.reviews[0].rating}</p>
                {/* Additional details can be displayed here */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-8">No search results found</p>
      )}
    </div>
  );
};

export default VlogSearch;
