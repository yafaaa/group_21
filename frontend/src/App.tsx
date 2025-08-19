import React from 'react';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/auth/LoginPage';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AdminDashboard from '@/pages/AdminDashboard';
import MentorDashboard from '@/pages/MentorDashboard';
import StudentDashboard from '@/pages/StudentDashboard';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardRouter: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'mentor':
      return <Navigate to="/mentor" replace />;
    case 'student':
      return <Navigate to="/student" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const App = () => (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardRouter />} />
            {/* <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/StudentDashboard" element={<StudentDashboard />} />
            <Route path="/MentorDashboard" element={<MentorDashboard />} /> */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mentor" 
              element={
                <ProtectedRoute allowedRoles={['mentor']}>
                  <MentorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
);

export default App;
