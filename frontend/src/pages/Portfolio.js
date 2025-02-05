// src/pages/Portfolio.jsx
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiServices';

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div className="bg-white rounded shadow p-6">Loading portfolios...</div>;
  }

  if (error) {
    return (
      <div className="bg-white rounded shadow p-6 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Your Portfolios</h1>
      {portfolios.length === 0 ? (
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

              <ul className="list-disc list-inside text-sm text-gray-700">
                {portfolio.assets?.map((asset, idx) => (
                  <li key={idx}>
                    {asset.symbol}: {asset.shares} shares @ ${asset.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
