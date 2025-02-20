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
    <div className="bg-shade-8 p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-shade-1 mb-6">System Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-xl font-semibold text-shade-2">Total Users</p>
          <p className="text-3xl font-bold text-shade-1">{stats.userCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-xl font-semibold text-shade-2">Admin Count</p>
          <p className="text-3xl font-bold text-shade-1">{stats.adminCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-xl font-semibold text-shade-2">Total Portfolios</p>
          <p className="text-3xl font-bold text-shade-1">{stats.portfolioCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-xl font-semibold text-shade-2">Avg. Portfolios per User</p>
          <p className="text-3xl font-bold text-shade-1">
            {stats.userCount > 0 ? (stats.portfolioCount / stats.userCount).toFixed(2) : 0}
          </p>
        </div>
      </div>
      {stats.systemUptime && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <p className="text-xl font-semibold text-shade-2">System Uptime</p>
          <p className="text-3xl font-bold text-shade-1">{stats.systemUptime}</p>
        </div>
      )}
    </div>
  );
}
