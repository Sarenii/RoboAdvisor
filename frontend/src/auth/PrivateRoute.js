import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * A wrapper component that protects routes which only authenticated users
 * (and optionally admin users) can access.
 * 
 * @param {ReactNode} children   The component to render if authorized
 * @param {boolean} adminOnly    If true, only admin users are allowed
 */
export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Only admins can access
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized
  return children;
}
