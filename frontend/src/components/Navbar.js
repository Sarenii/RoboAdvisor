import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  // A helper function to return classes for NavLink based on whether it's active.
  const linkClasses = ({ isActive }) =>
    isActive
      ? 'px-3 py-1 rounded bg-shade-4 text-white' // Active link style
      : 'px-3 py-1 rounded hover:bg-shade-3 hover:text-white';

  const mobileLinkClasses = ({ isActive }) =>
    isActive
      ? 'block p-2 rounded bg-shade-4 text-white'
      : 'block p-2 rounded hover:bg-shade-3 hover:text-white';

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

            {/* Other Pages (no sign in required, as per your setup) */}
            <NavLink to="/dashboard" className={linkClasses}>
              Dashboard
            </NavLink>
           

            {user ? (
              <button
                onClick={handleSignOut}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-500"
              >
                Sign Out
              </button>
            ) : (
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
          
          {user ? (
            <button
              onClick={() => {
                setMobileOpen(false);
                handleSignOut();
              }}
              className="block w-full text-left p-2 rounded bg-red-600 hover:bg-red-500 mt-2"
            >
              Sign Out
            </button>
          ) : (
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
