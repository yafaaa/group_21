// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import Navbar from '@/components/common/Navbar';
import { isAuthenticated } from '@/utils/authUtils';
import Login  from '@/pages/auth/Login';
import Home  from '@/pages/student/Home';
import ManageCenter from '@/pages/admin/ManageCenter';
import { UserRole } from '@/constants';
import { ProtectedRoute } from './ProtectedRoute';
import Layout from '@/pages/admin/Layout';

const VerificationGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pendingVerification = localStorage.getItem('pendingVerification');
    if (pendingVerification && window.location.pathname !== '/verify-email') {
      navigate('/verify-email', { state: { email: pendingVerification } });
    }
  }, [navigate]);

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         {/* Protected Admin Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <VerificationGuard>
                <ManageCenter/>
              </VerificationGuard>
            </ProtectedRoute>
          } 
        />
        Profile
        <Route 
          path="/Profile" 
          element={
            <ProtectedRoute >
              <VerificationGuard>
                <Home />
              </VerificationGuard>
            </ProtectedRoute>
          } 
        />
        {/* Protected Restaurant Routes with Sidebar Layout */}
        <Route
          element={
            <ProtectedRoute requiredRole={UserRole.MENTOR}>
              <VerificationGuard>
                <Layout />
              </VerificationGuard>
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/contact-info" element={<Home />} />
          <Route path="/my-food-menu" element={<Home />} />
          <Route path="/qrcode" element={<Home />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
