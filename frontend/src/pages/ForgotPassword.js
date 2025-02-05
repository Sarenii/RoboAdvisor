import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/apiServices';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      // Example call to request a password reset from your backend
      // This endpoint might send an email with a token/link
      const res = await apiService.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'A reset link has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg border-2 border-shade-4 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

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
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 
                         focus:outline-none focus:ring focus:ring-shade-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@doe.com"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-shade-5 hover:bg-shade-4 text-green-dark w-full rounded px-4 py-2 font-semibold"
          >
            Request Reset
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Remembered your password?{' '}
          <Link to="/signin" className="text-shade-2 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
