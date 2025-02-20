// src/pages/AdminPanel.jsx

import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import apiService from '../services/apiServices';
import AdminAnalytics from './AdminAnalytics.js'; // create this page

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Deactivate a user
  const handleDeactivate = async (userId) => {
    try {
      await apiService.put(`/admin/users/${userId}/deactivate`);
      fetchUsers(); // refresh user list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to deactivate user.');
    }
  };

  // Promote a user to admin
  const handlePromote = async (userId) => {
    try {
      await apiService.put(`/admin/users/${userId}/promote`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to promote user.');
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-6">
        Manage user accounts, monitor system performance, and access analytics here.
      </p>

      {/* Navigation inside Admin Panel */}
      <nav className="flex space-x-4 mb-4">
        <Link to="/dashboard/admin" className="underline">
          User Management
        </Link>
        <Link to="/dashboard/admin/analytics" className="underline">
          System Analytics
        </Link>
      </nav>

      {/* If your Router is set up with nested routes, handle them here */}
      <Routes>
        {/* Index route -> shows user management table */}
        <Route
          index
          element={
            loading ? (
              <div>Loading users...</div>
            ) : error ? (
              <div className="text-red-600">Error: {error}</div>
            ) : (
              <>
                {users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  <div className="overflow-x-auto bg-shade-8 rounded">
                    <table className="min-w-full table-auto">
                      <thead className="bg-green-dark text-white">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-semibold">User ID</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Role</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u._id} className="border-b hover:bg-shade-9">
                            <td className="px-4 py-2 text-sm">{u._id}</td>
                            <td className="px-4 py-2 text-sm">{u.email}</td>
                            <td className="px-4 py-2 text-sm">{u.role}</td>
                            <td className="px-4 py-2 text-sm">
                              <button
                                onClick={() => handleDeactivate(u._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                              >
                                Deactivate
                              </button>
                              <button
                                onClick={() => handlePromote(u._id)}
                                className="bg-shade-4 text-white px-3 py-1 rounded hover:bg-shade-3"
                              >
                                Promote
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )
          }
        />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Routes>
    </div>
  );
}
