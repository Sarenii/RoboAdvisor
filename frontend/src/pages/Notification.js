// src/pages/Notifications.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiServices';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch unread notifications
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark a specific notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await apiService.put(`/notifications/${notificationId}/read`);
      // Remove from local state
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to mark notification as read');
    }
  };

  if (loading) {
    return <div className="bg-white p-4 rounded shadow">Loading notifications...</div>;
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded shadow text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>You have no unread notifications.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications.map((notif) => (
            <li key={notif._id} className="py-2 flex justify-between items-center">
              <span>{notif.message}</span>
              <button
                onClick={() => handleMarkAsRead(notif._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Mark as Read
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
