// src/routes/ProtectedPage.tsx
import React from 'react';
import { UserRole } from '@/constants';
import { ProtectedRoute } from './ProtectedRoute';
import { VerificationGuard } from './VerificationGuard';

interface ProtectedPageProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedPage: React.FC<ProtectedPageProps> = ({ children, requiredRole }) => {
  return (
    <ProtectedRoute requiredRole={requiredRole}>
      <VerificationGuard>{children}</VerificationGuard>
    </ProtectedRoute>
  );
};
