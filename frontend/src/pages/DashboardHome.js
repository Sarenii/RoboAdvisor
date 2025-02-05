import React from 'react';

export default function DashboardHome() {
  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Here you can get an overview of your investment accounts, 
        track performance, and navigate to more detailed sections 
        like your Portfolio or the Admin Panel.
      </p>

      {/* Example Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Portfolio Value</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">$15,400</p>
        </div>
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Monthly Returns</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">+4.2%</p>
        </div>
        <div className="bg-shade-8 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Risk Level</h2>
          <p className="text-2xl font-bold text-shade-2 mt-2">Moderate</p>
        </div>
      </div>
    </div>
  );
}
