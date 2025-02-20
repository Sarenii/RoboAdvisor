// src/pages/Portfolio.jsx
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiServices';

// Example symbol options you can display in a dropdown
const SYMBOL_OPTIONS = [
  { label: 'Apple (AAPL)', symbol: 'AAPL' },
  { label: 'Tesla (TSLA)', symbol: 'TSLA' },
  { label: 'Amazon (AMZN)', symbol: 'AMZN' },
  { label: 'SPDR S&P 500 (SPY)', symbol: 'SPY' },
  { label: 'Vanguard Total Bond (BND)', symbol: 'BND' },
];

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for showing/hiding the create/edit form
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form fields
  const [portfolioName, setPortfolioName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('Moderate');
  const [allocationType, setAllocationType] = useState('automated');
  const [assets, setAssets] = useState([]); // used only if allocationType === 'manual'
  
  // Form status
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing portfolios
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

  // 1. Handlers for manual asset rows
  const handleAddAsset = () => {
    setAssets((prev) => [...prev, { symbol: '', shares: '', price: '' }]);
  };

  const handleAssetChange = (index, field, value) => {
    setAssets((prev) =>
      prev.map((asset, idx) =>
        idx === index ? { ...asset, [field]: value } : asset
      )
    );
  };

  const handleRemoveAsset = (index) => {
    setAssets((prev) => prev.filter((_, idx) => idx !== index));
  };

  // 2. Open form for new portfolio
  const handleOpenForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setPortfolioName('');
    setInvestmentAmount('');
    setRiskTolerance('Moderate');
    setAllocationType('automated');
    setAssets([]);
    setFormError(null);
    setShowForm(true);
  };

  // 3. Open form for editing an existing portfolio
  const handleEdit = (portfolio) => {
    setIsEditing(true);
    setCurrentId(portfolio._id);
    setPortfolioName(portfolio.name || '');
    // If you store “investmentAmount” in the backend, or else remove it
    setInvestmentAmount(portfolio.investmentAmount || '');
    setRiskTolerance(portfolio.riskTolerance || 'Moderate');
    // If you stored “allocationType” in the backend, or default to “manual/automated”
    setAllocationType(portfolio.allocationType || 'automated');
    setAssets(portfolio.assets || []);
    setFormError(null);
    setShowForm(true);
  };

  // 4. Handle deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;
    try {
      await apiService.delete(`/portfolios/${id}`);
      fetchPortfolios();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete portfolio.');
    }
  };

  // 5. Handle form submission for create/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    // Build the payload
    // Depending on your backend, if it expects “investmentAmount” or not
    const portfolioData = {
      name: portfolioName,
      riskTolerance,
      allocationType,
      // Convert to number in case your backend uses it
      investmentAmount: Number(investmentAmount) || 0, 
      assets:
        allocationType === 'manual'
          ? assets.map((asset) => ({
              symbol: asset.symbol,
              shares: Number(asset.shares),
              price: Number(asset.price),
            }))
          : [],
    };

    try {
      if (isEditing && currentId) {
        await apiService.put(`/portfolios/${currentId}`, portfolioData);
      } else {
        await apiService.post('/portfolios', portfolioData);
      }
      setShowForm(false);
      fetchPortfolios();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save portfolio.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Your Portfolios</h1>

      {/* Button to open the creation form if not visible */}
      {!showForm && (
        <button
          onClick={handleOpenForm}
          className="bg-green-dark hover:bg-green-800 text-white px-4 py-2 rounded font-semibold"
        >
          Create Portfolio
        </button>
      )}

      {/* The form for creating/editing */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 font-semibold">Portfolio Name</label>
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-shade-3"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Investment Amount</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-shade-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-shade-3"
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Allocation Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="allocationType"
                  value="automated"
                  checked={allocationType === 'automated'}
                  onChange={() => setAllocationType('automated')}
                />
                <span className="ml-2">Automated</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="allocationType"
                  value="manual"
                  checked={allocationType === 'manual'}
                  onChange={() => setAllocationType('manual')}
                />
                <span className="ml-2">Manual</span>
              </label>
            </div>
          </div>

          {/* Only show the asset table if user selects "manual" */}
          {allocationType === 'manual' && (
            <div>
              <label className="block mb-1 font-semibold">Assets</label>
              {assets.map((asset, index) => (
                <div key={index} className="flex space-x-2 items-center mb-2">
                  <select
                    value={asset.symbol}
                    onChange={(e) => handleAssetChange(index, 'symbol', e.target.value)}
                    className="w-1/3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-shade-3"
                    required
                  >
                    <option value="">-- Symbol --</option>
                    {SYMBOL_OPTIONS.map((opt) => (
                      <option key={opt.symbol} value={opt.symbol}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Shares"
                    value={asset.shares}
                    onChange={(e) => handleAssetChange(index, 'shares', e.target.value)}
                    className="w-1/3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-shade-3"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={asset.price}
                    onChange={(e) => handleAssetChange(index, 'price', e.target.value)}
                    className="w-1/3 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-shade-3"
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
                className="bg-green-dark hover:bg-green-800 text-white px-3 py-1 rounded mt-2"
              >
                Add Asset
              </button>
            </div>
          )}

          {formError && (
            <div className="text-red-600 bg-red-50 p-2 rounded border border-red-200">
              {formError}
            </div>
          )}
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded font-semibold"
              disabled={submitting}
            >
              {submitting
                ? 'Saving...'
                : isEditing
                ? 'Update Portfolio'
                : 'Create Portfolio'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Display existing portfolios */}
      {loading ? (
        <div>Loading portfolios...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : portfolios.length === 0 ? (
        <p>You have no portfolios yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="bg-gray-100 rounded p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">{portfolio.name}</h2>
              {/* If your backend stores this or not */}
              {portfolio.investmentAmount && (
                <p className="mb-1">
                  <strong>Investment:</strong> ${portfolio.investmentAmount}
                </p>
              )}
              <p className="mb-1">
                <strong>Value:</strong> ${portfolio.value?.toFixed(2)}
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
                      {asset.symbol}: {asset.shares} shares @ ${asset.price?.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(portfolio)}
                  className="bg-shade-7 hover:bg-shade-4 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(portfolio._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
