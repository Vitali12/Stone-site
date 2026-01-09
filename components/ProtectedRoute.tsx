import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, showAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      showAuthModal();
    }
  }, [isAuthenticated, showAuthModal, location]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;