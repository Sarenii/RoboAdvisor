import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className="bg-shade-2 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0 text-xl font-bold">
            <Link to="/">RoboAdvisor</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:text-shade-9">
              Home
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="hover:text-shade-9">
                  Dashboard
                </Link>
                <Link to="/portfolio" className="hover:text-shade-9">
                  Portfolio
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hover:text-shade-9">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="bg-shade-4 hover:bg-shade-3 text-white px-3 py-1 rounded"
                >
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/signin" className="hover:text-shade-9">
                  Sign In
                </Link>
                <Link to="/signup" className="hover:text-shade-9">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-200 hover:text-shade-9 focus:outline-none"
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
        <div className="md:hidden bg-shade-2 px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block hover:bg-shade-3 p-2"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block hover:bg-shade-3 p-2"
              >
                Dashboard
              </Link>
              <Link
                to="/portfolio"
                onClick={() => setMobileOpen(false)}
                className="block hover:bg-shade-3 p-2"
              >
                Portfolio
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block hover:bg-shade-3 p-2"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
                className="block w-full text-left hover:bg-shade-3 p-2"
              >
                Sign Out
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className="block hover:bg-shade-3 p-2"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block hover:bg-shade-3 p-2"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
