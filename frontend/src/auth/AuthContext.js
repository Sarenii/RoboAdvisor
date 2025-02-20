import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/apiServices';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      apiService.get('/auth/current')
        .then((response) => {
          if (response.data?.user) {
            setUser(response.data.user);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

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

  const signUp = async (email, password) => {
    try {
      const res = await apiService.post('/auth/register', { email, password });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error?.response?.data?.message || 'Sign Up error' };
    }
  };

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

export const useAuth = () => useContext(AuthContext);
