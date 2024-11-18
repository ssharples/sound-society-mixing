import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Submit from './pages/Submit';
import Dashboard from './pages/Dashboard';
import Review from './pages/Review';
import Auth from './pages/Auth';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import QualityReview from './pages/QualityReview';
import LoyaltyDashboard from './pages/LoyaltyDashboard';
import Invoices from './pages/Invoices';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-chrome-900">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/portfolio" element={<Portfolio />} />
        
        {/* Protected Routes */}
        <Route path="/submit" element={<ProtectedRoute><Submit /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
        <Route path="/loyalty" element={<ProtectedRoute><LoyaltyDashboard /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
        <Route path="/quality-review/:projectId" element={<AdminRoute><QualityReview /></AdminRoute>} />
        <Route path="/invoices" element={<AdminRoute><Invoices /></AdminRoute>} />
      </Routes>
    </div>
  );
}

export default App;