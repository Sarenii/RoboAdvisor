import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import apiService from '../services/apiServices';

export default function Dashboard() {
  const { user } = useAuth();

  // Local state for loading, error, and the fetched dashboard data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    /**
     * Fetch the user's dashboard stats from the backend
     */
    const fetchDashboardData = async () => {
      try {
        // Make sure your backend endpoint is exactly this path:
        // GET /api/dashboard
        const response = await apiService.get('/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 bg-red-50 p-2 mb-4 rounded border border-red-200">
        {error}
      </div>
    );
  }

  if (!dashboardData) {
    return <div>No dashboard data found.</div>;
  }

  // Destructure the data from your server response
  const { totalValue, monthlyReturn, riskLevel, recentActivities } = dashboardData;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">
        Welcome, <strong>{user?.email || 'Guest'}</strong>!
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Portfolio Value */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Portfolio Value</h2>
          <p className="text-2xl font-bold text-shade-2">
            ${totalValue?.toFixed(2)}
          </p>
        </div>

        {/* Monthly Return */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Monthly Return</h2>
          <p className="text-2xl font-bold text-shade-2">
            {monthlyReturn >= 0
              ? `+${(monthlyReturn * 100).toFixed(2)}%`
              : `${(monthlyReturn * 100).toFixed(2)}%`}
          </p>
        </div>

        {/* Risk Level */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Risk Level</h2>
          <p className="text-2xl font-bold text-shade-2">
            {riskLevel || 'Moderate'}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {recentActivities?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {recentActivities.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        ) : (
          <p>No recent activity.</p>
        )}
      </div>
    </div>
  );
}
