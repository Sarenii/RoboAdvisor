// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiServices';

export default function Profile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [goals, setGoals] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('Moderate');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await apiService.get('/profile');
        setName(res.data.name || '');
        setPhone(res.data.phone || '');
        setGoals(res.data.goals || '');
        setRiskTolerance(res.data.riskTolerance || 'Moderate');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      await apiService.put('/profile', {
        name,
        phone,
        goals,
        riskTolerance,
      });
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Financial Goals</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="E.g. Retire by 2030, Buy a house in 5 years, etc."
          />
          <p className="text-sm text-gray-600 mt-1">
            You must set financial goals before you can create portfolios.
          </p>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Risk Tolerance</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-dark text-white px-4 py-2 rounded font-semibold"
        >
          Save
        </button>
      </form>
    </div>
  );
}
