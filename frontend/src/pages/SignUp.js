import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('newuser@example.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check password match
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    if (!signUp) {
      setError('Sign up functionality not available at the moment.');
      return;
    }

    // If they match, proceed
    const result = await signUp(email, password);
    if (result?.success) {
      navigate('/dashboard');
    } else {
      setError(result?.message || 'Sign Up failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-6">
      {/* Outer container for joined card */}
      <div
        className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden
                   flex flex-col md:flex-row border-2 border-green-dark"
      >
        {/* Left side: Illustration */}
        <div className="md:w-1/2 h-64 md:h-auto flex items-center justify-center bg-shade-9">
          <img
            src="/images/Sign up-pana.png"
            alt="Sign Up Illustration"
            className="h-48 md:h-64 object-contain"
          />
        </div>

        {/* Right side: Sign Up Form */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

          {error && (
            <div className="text-red-600 bg-red-50 p-2 mb-4 rounded border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block mb-1 font-semibold">Password</label>
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
                          3 0 11-4.243-4.243 3 3 0 
                          014.243 4.243z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 
                          7.522 5 12 5c4.478 0 
                          8.268 2.943 9.542 
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
                          8.268 2.943 9.542 
                          7-1.274 4.057-5.064 
                          7-9.542 7-1.63 0-3.173-.386-4.57-1.07"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
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
                          8.268 2.943 9.542 
                          7-.763 2.352-2.47 4.37-4.75 
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
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-shade-2 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
