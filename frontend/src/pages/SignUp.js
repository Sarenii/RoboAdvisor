import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('newuser@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signUp(email, password);
    if (result?.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Sign Up failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@doe.com"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-shade-4 hover:bg-shade-3 text-white rounded px-4 py-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
