import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
// import PrivateRoute from './auth/PrivateRoute'; // We won't use it now, but keep for later

import Navbar from './components/Navbar';
import Footer from './components/Footer';

/* Pages */
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Portfolio from './pages/Portfolio';
import AdminPanel from './pages/AdminPanel';
import AdminAnalytics from './pages/AdminAnalytics'; 
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import MarketData from './pages/MarketData';
import Profile from './pages/Profile';
import Notification from './pages/Notification';



function App() {
  return (
    <Router>
      {/* AuthProvider wraps the entire app to keep sign in/up functionality available */}
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              


              {/* 
                No PrivateRoute usage here, so Dashboard, Portfolio, and AdminPanel
                are accessible to everyone for now.
              */}
               {/* Dashboard (Nested Routes) */}
               <Route path="/dashboard" element={<DashboardLayout />}>
                {/* index route -> /dashboard */}
                <Route index element={<DashboardHome />} />
                {/* /dashboard/portfolio */}
                <Route path="portfolio" element={<Portfolio />} />
                {/* /dashboard/admin */}
                <Route path="admin" element={<AdminPanel />} />
                <Route path="market" element={<MarketData />} />
              </Route>

            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
