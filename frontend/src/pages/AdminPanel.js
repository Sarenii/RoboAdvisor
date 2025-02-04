import React, { useEffect, useState } from 'react';
import apiService from '../services/apiServices';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Example: fetch all user accounts
    apiService.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-2">
        Manage user accounts, system performance, and analytics. Only accessible if your role is "admin".
      </p>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-shade-3 text-white">
                <th className="p-2 text-left">User ID</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b">
                  <td className="p-2">{u._id}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2">
                    {/* Example button for deactivating or changing role */}
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
