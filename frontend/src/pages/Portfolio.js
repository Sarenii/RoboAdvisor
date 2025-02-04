import React, { useEffect, useState } from 'react';
import apiService from '../services/apiServices';

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: fetch user portfolios from backend
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await apiService.get('/portfolios');
        setPortfolios(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  if (loading) {
    return <div>Loading portfolios...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Portfolios</h1>
      {portfolios.length === 0 ? (
        <p>You have no portfolios yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="bg-white rounded p-4 shadow">
              <h2 className="text-xl font-semibold">{portfolio.name}</h2>
              <p>Value: ${portfolio.value}</p>
              <p>Risk Level: {portfolio.riskTolerance}</p>
              {/* Additional data or actions */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
