// src/pages/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import apiService from '../services/apiServices';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardHome() {
  const { user } = useAuth();
  
  // Local state for aggregated dashboard data from /dashboard endpoint
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  // Local state for individual portfolios to build a breakdown chart
  const [portfolios, setPortfolios] = useState([]);
  const [loadingPortfolios, setLoadingPortfolios] = useState(true);
  const [portfoliosError, setPortfoliosError] = useState(null);

  // Download report handler
  const handleDownloadReport = async () => {
    try {
      const res = await apiService.get('/report', { responseType: 'blob' });
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

  // Fetch overall dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
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

  // Fetch portfolios for breakdown chart
  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoadingPortfolios(true);
      try {
        const response = await apiService.get('/portfolios');
        setPortfolios(response.data);
      } catch (err) {
        setPortfoliosError(err.response?.data?.message || 'Failed to load portfolios.');
      } finally {
        setLoadingPortfolios(false);
      }
    };
    fetchPortfolios();
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

  const { totalValue, monthlyReturn, riskLevel } = dashboardData;

  // Prepare data for the pie chart of portfolio breakdown using a distinct color palette.
  const pieChartData = {
    labels: portfolios.map((pf) => pf.name),
    datasets: [
      {
        data: portfolios.map((pf) => pf.value),
        backgroundColor: [
          '#1f77b4',
          '#ff7f0e',
          '#2ca02c',
          '#d62728',
          '#9467bd',
          '#8c564b',
          '#e377c2',
          '#7f7f7f',
          '#bcbd22',
          '#17becf',
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Here you can get an overview of your investment accounts, track performance, and navigate to more detailed sections like your Portfolio or the Admin Panel.
      </p>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Portfolio Value</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">${totalValue?.toFixed(2)}</p>
        </div>
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Monthly Returns</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">
            {monthlyReturn >= 0
              ? `+${(monthlyReturn * 100).toFixed(2)}%`
              : `${(monthlyReturn * 100).toFixed(2)}%`}
          </p>
        </div>
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Risk Level</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">{riskLevel || 'Moderate'}</p>
        </div>
      </div>

      {/* Portfolio Breakdown Chart */}
      {loadingPortfolios ? (
        <div>Loading portfolio breakdown...</div>
      ) : portfoliosError ? (
        <div className="text-red-600">{portfoliosError}</div>
      ) : portfolios.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Portfolio Breakdown</h2>
          <Pie data={pieChartData} />
        </div>
      ) : (
        <p className="text-gray-700">You have no portfolios to display.</p>
      )}

      <button
        onClick={handleDownloadReport}
        className="bg-shade-5 hover:bg-shade-4 text-green-dark px-4 py-2 rounded font-semibold"
      >
        Download Report
      </button>
    </div>
  );
}
