// src/pages/Portfolio.jsx
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiServices';

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for showing/hiding the create portfolio form
  const [showCreateForm, setShowCreateForm] = useState(false);
  // Form state for portfolio details
  const [portfolioName, setPortfolioName] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('Moderate');
  // State for assets: each asset has { symbol, shares, price }
  const [assets, setAssets] = useState([]);
  const [createError, setCreateError] = useState(null);
  const [creating, setCreating] = useState(false);

  // Fetch portfolios from the backend
  const fetchPortfolios = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.get('/portfolios');
      setPortfolios(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load portfolios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Add a new empty asset row
  const handleAddAsset = () => {
    setAssets([...assets, { symbol: '', shares: '', price: '' }]);
  };

  // Update a specific asset field
  const handleAssetChange = (index, field, value) => {
    const updatedAssets = assets.map((asset, idx) =>
      idx === index ? { ...asset, [field]: value } : asset
    );
    setAssets(updatedAssets);
  };

  // Remove an asset row
  const handleRemoveAsset = (index) => {
    const updatedAssets = assets.filter((_, idx) => idx !== index);
    setAssets(updatedAssets);
  };

  // Handle form submission for creating a portfolio
  const handleCreatePortfolio = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreating(true);

    // Build the portfolio object
    const newPortfolio = {
      name: portfolioName,
      riskTolerance,
      // Ensure shares and price are numbers
      assets: assets.map((asset) => ({
        symbol: asset.symbol,
        shares: Number(asset.shares),
        price: Number(asset.price),
      })),
    };

    try {
      await apiService.post('/portfolios', newPortfolio);
      // Clear form fields and hide form on success
      setPortfolioName('');
      setRiskTolerance('Moderate');
      setAssets([]);
      setShowCreateForm(false);
      // Refresh portfolio list
      fetchPortfolios();
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create portfolio.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Your Portfolios</h1>

      {/* Create Portfolio Section */}
      <div className="mb-4">
        {showCreateForm ? (
          <form onSubmit={handleCreatePortfolio} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Portfolio Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring focus:ring-shade-3"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                placeholder="Enter portfolio name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Risk Tolerance</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring focus:ring-shade-3"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Assets Section */}
            <div>
              <label className="block mb-1 font-semibold">Assets</label>
              {assets.map((asset, index) => (
                <div key={index} className="flex space-x-2 items-center mb-2">
                  <input
                    type="text"
                    placeholder="Symbol"
                    value={asset.symbol}
                    onChange={(e) =>
                      handleAssetChange(index, 'symbol', e.target.value)
                    }
                    className="w-1/3 border border-gray-300 rounded px-2 py-1 
                               focus:outline-none focus:ring focus:ring-shade-3"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Shares"
                    value={asset.shares}
                    onChange={(e) =>
                      handleAssetChange(index, 'shares', e.target.value)
                    }
                    className="w-1/3 border border-gray-300 rounded px-2 py-1 
                               focus:outline-none focus:ring focus:ring-shade-3"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={asset.price}
                    onChange={(e) =>
                      handleAssetChange(index, 'price', e.target.value)
                    }
                    className="w-1/3 border border-gray-300 rounded px-2 py-1 
                               focus:outline-none focus:ring focus:ring-shade-3"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAsset(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAsset}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mt-2"
              >
                Add Asset
              </button>
            </div>

            {createError && (
              <div className="text-red-600 bg-red-50 p-2 rounded border border-red-200">
                {createError}
              </div>
            )}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-dark hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
                disabled={creating}
              >
                {creating ? 'Creating...' : 'Create Portfolio'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
                disabled={creating}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-shade-5 hover:bg-shade-4 text-green-dark px-4 py-2 rounded font-semibold"
          >
            Create Portfolio
          </button>
        )}
      </div>

      {/* Display Portfolios */}
      {loading ? (
        <div>Loading portfolios...</div>
      ) : error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : portfolios.length === 0 ? (
        <p>You have no portfolios yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="bg-shade-8 rounded p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">{portfolio.name}</h2>
              <p className="mb-1">
                <strong>Value:</strong> ${portfolio.value}
              </p>
              <p className="mb-1">
                <strong>Risk:</strong> {portfolio.riskTolerance}
              </p>
              <p className="mb-2">
                <strong>Assets:</strong> {portfolio.assets?.length || 0}
              </p>
              {portfolio.assets && portfolio.assets.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {portfolio.assets.map((asset, idx) => (
                    <li key={idx}>
                      {asset.symbol}: {asset.shares} shares @ ${asset.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
