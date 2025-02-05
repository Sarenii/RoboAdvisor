import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiService from '../services/apiServices';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Example: read token from URL query param like ?token=xyz
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      // Example call to reset the password via your backend
      const res = await apiService.post('/auth/reset-password', {
        token,
        password,
      });
      setMessage(res.data.message || 'Your password has been reset successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg border-2 border-shade-4 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {error && (
          <div className="text-red-600 bg-red-50 p-2 mb-4 rounded border border-red-200">
            {error}
          </div>
        )}
        {message && (
          <div className="text-green-700 bg-green-50 p-2 mb-4 rounded border border-green-200">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block mb-1 font-semibold">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring focus:ring-shade-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  // Eye slash icon
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825l-1.908-1.907m5.226-5.226a3 
                        3 0 11-4.243-4.243 3 3 0 014.243 4.243z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.522 5 
                        12 5c4.478 0 8.268 2.943 9.542 
                        7-.763 2.352-2.47 4.37-4.75 
                        5.545M3 3l18 18"
                    />
                  </svg>
                ) : (
                  // Eye icon
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 
                        0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 
                        7.522 5 12 5c4.478 0 
                        8.268 2.943 9.542 7-1.274 
                        4.057-5.064 7-9.542 
                        7-1.63 0-3.173-.386-4.57-1.07"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block mb-1 font-semibold">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 rounded px-3 py-2 
                           focus:outline-none focus:ring focus:ring-shade-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825l-1.908-1.907m5.226-5.226a3 
                        3 0 11-4.243-4.243 3 3 0 
                        014.243 4.243z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 
                        7.522 5 12 5c4.478 0 
                        8.268 2.943 9.542 7-.763 
                        2.352-2.47 4.37-4.75 
                        5.545M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 
                        11-6 0 3 3 0 016 
                        0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 
                        7.943 7.522 5 12 
                        5c4.478 0 8.268 
                        2.943 9.542 7-1.274 
                        4.057-5.064 7-9.542 
                        7-1.63 0-3.173-.386-4.57-1.07"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-shade-5 hover:bg-shade-4 text-green-dark w-full rounded px-4 py-2 font-semibold"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Changed your mind?{' '}
          <Link to="/signin" className="text-shade-2 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
