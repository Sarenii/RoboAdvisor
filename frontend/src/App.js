import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

/* Pages */
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      {/* AuthProvider wraps the entire app to provide auth state */}
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected Routes: Dashboard, Portfolio, Admin */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }/>
              <Route path="/portfolio" element={
                <PrivateRoute>
                  <Portfolio />
                </PrivateRoute>
              }/>
              <Route path="/admin" element={
                <PrivateRoute adminOnly={true}>
                  <AdminPanel />
                </PrivateRoute>
              }/>

             
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
