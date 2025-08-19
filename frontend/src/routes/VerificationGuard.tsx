// src/routes/VerificationGuard.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export const VerificationGuard = ({ children }: { children: React.ReactNode }) => {
  const pendingVerification = localStorage.getItem('pendingVerification');

  if (pendingVerification && window.location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" state={{ email: pendingVerification }} replace />;
  }

  return <>{children}</>;
};
