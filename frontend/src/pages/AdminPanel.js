// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiServices';
import AdminAnalytics from './AdminAnalytics';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("management");

  // Fetch all users for user management (admin only)
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
    if (activeTab === "management") {
      fetchUsers();
    }
  }, [activeTab]);

  // Promote a user to admin
  const handlePromote = async (userId) => {
    try {
      await apiService.put(`/admin/users/${userId}/promote`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to promote user.');
    }
  };

  // Demote an admin to regular user
  const handleDemote = async (userId) => {
    try {
      await apiService.put(`/admin/users/${userId}/demote`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to demote user.');
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await apiService.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-6">
        Manage user accounts and view system analytics.
      </p>
      {/* Tab toggle buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("management")}
          className={`px-4 py-2 rounded font-semibold ${activeTab === "management" ? "bg-shade-2 text-white" : "bg-shade-9 text-shade-3"}`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 rounded font-semibold ${activeTab === "analytics" ? "bg-shade-2 text-white" : "bg-shade-9 text-shade-3"}`}
        >
          System Analytics
        </button>
      </div>

      {activeTab === "management" ? (
        <>
          {loading ? (
            <div>Loading users...</div>
          ) : error ? (
            <div className="text-red-600">Error: {error}</div>
          ) : (
            <>
              {users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <div className="overflow-x-auto">
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
                          <td className="px-4 py-2 text-sm space-x-2">
                            {u.role === "admin" ? (
                              <button
                                onClick={() => handleDemote(u._id)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                              >
                                Demote
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePromote(u._id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                              >
                                Promote
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(u._id)}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <AdminAnalytics />
      )}
    </div>
  );
}
