import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import apiService from '../services/apiServices';

export default function DashboardHome() {
  const { user } = useAuth();
  const handleDownloadReport = async () => {
    try {
      const res = await apiService.get('/report', {
        responseType: 'blob', // so we can handle it as a downloadable file
      });
      // Convert blob to a downloadable link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'portfolio_report.txt');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to generate report');
    }
  };

  // Local state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch data for the authenticated user from your backend
    const fetchDashboardData = async () => {
      try {
        // Matches your server: GET /api/dashboard
        const response = await apiService.get('/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data.');
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

  // Destructure the real data from your backend
  const { totalValue, monthlyReturn, riskLevel } = dashboardData;

  return (
    
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Here you can get an overview of your investment accounts, track performance,
        and navigate to more detailed sections like your Portfolio or the Admin Panel.
      </p>

      {/* Stats Cards (using fetched data) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Portfolio Value</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">
            ${totalValue?.toFixed(2)}
          </p>
        </div>

        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Monthly Returns</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">
            {monthlyReturn >= 0
              ? `+${(monthlyReturn * 100).toFixed(2)}%`
              : `${(monthlyReturn * 100).toFixed(2)}%`}
          </p>
        </div>
        <div>
      {/* ... existing code ... */}
      <button
        onClick={handleDownloadReport}
        className="bg-shade-5 hover:bg-shade-4 text-green-dark px-4 py-2 rounded font-semibold mt-4"
      >
        Download Report
      </button>
    </div>
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Risk Level</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">
            {riskLevel || 'Moderate'}
          </p>
        </div>
        
      </div>
    </div>
  );
}

