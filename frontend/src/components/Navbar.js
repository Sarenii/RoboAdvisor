// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import apiService from '../services/apiServices';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Optional: notifications count (unread).
  // If you want to display a count in the navbar.
  const [unreadCount, setUnreadCount] = useState(0);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  // A helper function for NavLink styling
  const linkClasses = ({ isActive }) =>
    isActive
      ? 'px-3 py-1 rounded bg-shade-4 text-white'
      : 'px-3 py-1 rounded hover:bg-shade-3 hover:text-white';

  const mobileLinkClasses = ({ isActive }) =>
    isActive
      ? 'block p-2 rounded bg-shade-4 text-white'
      : 'block p-2 rounded hover:bg-shade-3 hover:text-white';

  // Fetch unread notifications count (optional)
  const fetchNotifications = async () => {
    try {
      const res = await apiService.get('/notifications');
      setUnreadCount(res.data.length); // e.g. total unread
    } catch (err) {
      // silently fail
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <nav className="bg-green-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-xl font-bold">
            <NavLink to="/">RoboAdvisor</NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center">
            {/* Public Links */}
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              About
            </NavLink>

            {/* If user is logged in, show Dashboard, Profile, etc. */}
            {user && (
              <>
                <NavLink to="/dashboard" className={linkClasses}>
                  Dashboard
                </NavLink>
                <NavLink to="/profile" className={linkClasses}>
                  Profile
                </NavLink>
                
                {/* Optional Notifications link */}
                <NavLink to="/notifications" className={linkClasses}>
                  Notifications{unreadCount > 0 && ` (${unreadCount})`}
                </NavLink>

                {/* Admin link, only if role == 'admin' */}
                {user.role === 'admin' && (
                  <NavLink to="/dashboard/admin" className={linkClasses}>
                    Admin
                  </NavLink>
                )}

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 ml-2"
                >
                  Sign Out
                </button>
              </>
            )}

            {/* If no user, show Sign In / Sign Up */}
            {!user && (
              <>
                <NavLink to="/signin" className={linkClasses}>
                  Sign In
                </NavLink>
                <NavLink to="/signup" className={linkClasses}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-100 hover:text-shade-9 focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-dark px-2 pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className={mobileLinkClasses}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={mobileLinkClasses}
            onClick={() => setMobileOpen(false)}
          >
            About
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/dashboard"
                className={mobileLinkClasses}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                className={mobileLinkClasses}
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </NavLink>
              <NavLink
                to="/notifications"
                className={mobileLinkClasses}
                onClick={() => setMobileOpen(false)}
              >
                Notifications{unreadCount > 0 && ` (${unreadCount})`}
              </NavLink>
              
              {user.role === 'admin' && (
                <NavLink
                  to="/dashboard/admin"
                  className={mobileLinkClasses}
                  onClick={() => setMobileOpen(false)}
                >
                  Admin
                </NavLink>
              )}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
                className="block w-full text-left p-2 rounded bg-red-600 hover:bg-red-500 mt-2"
              >
                Sign Out
              </button>
            </>
          )}

          {!user && (
            <>
              <NavLink
                to="/signin"
                className={mobileLinkClasses}
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className={mobileLinkClasses}
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
