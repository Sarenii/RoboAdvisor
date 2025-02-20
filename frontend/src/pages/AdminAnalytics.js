// src/pages/AdminAnalytics.jsx
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiServices';

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiService.get('/admin/analytics');
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analytics.');
      }
    };
    fetchStats();
  }, []);

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!stats) return <div>Loading analytics...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">System Analytics</h2>
      <p>
        <strong>Total Users:</strong> {stats.userCount}
      </p>
      <p>
        <strong>Total Portfolios:</strong> {stats.portfolioCount}
      </p>
      {/* Add more stats as needed */}
    </div>
  );
}
