import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/apiServices';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means no user is logged in
  const [loading, setLoading] = useState(true);

  // On app load, optionally check if there's a token in localStorage or cookie
  // and attempt to fetch the user from the backend
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Validate token with your backend, fetch user info
      apiService.get('/auth/current')
        .then(response => {
          if (response.data?.user) {
            setUser(response.data.user);
          }
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Function to handle login
  const signIn = async (email, password) => {
    try {
      const res = await apiService.post('/auth/login', { email, password });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || 'Login error' };
    }
  };

  // Function to handle sign up
  const signUp = async (email, password) => {
    try {
      const res = await apiService.post('/auth/register', { email, password });
      // auto-login or prompt user to sign in again
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || 'Sign Up error' };
    }
  };

  // Function to handle logout
  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
