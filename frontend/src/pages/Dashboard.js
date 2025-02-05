import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  // Example stats (replace with actual data fetching)
  const stats = [
    { id: 1, label: 'Total Portfolio Value', value: '$10,500' },
    { id: 2, label: 'Monthly Return', value: '+3.2%' },
    { id: 3, label: 'Risk Level', value: 'Moderate' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">
        Welcome, <strong>{user?.email || 'Guest'}</strong>!
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-2">{stat.label}</h2>
            <p className="text-2xl font-bold text-shade-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Example Section: Recent Activity */}
      <div className="mt-8 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Portfolio Rebalanced on 01/30/2025.</li>
          <li>Added $500 to Tech Growth Portfolio.</li>
          <li>Received quarterly dividends from BlueChip Fund.</li>
        </ul>
      </div>
    </div>
  );
}
