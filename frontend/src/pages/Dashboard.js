import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user?.email}!</p>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Your Investment Overview</h2>
        <p className="mb-2">
          Here you could show a summary of user portfolios, real-time performance metrics, 
          and quick links to manage them.
        </p>
        <ul className="list-disc list-inside pl-2">
          <li>Portfolio Balance</li>
          <li>Allocation by Asset Type</li>
          <li>Real-time Market Data</li>
        </ul>
      </div>
    </div>
  );
}
