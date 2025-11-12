import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
    // Redirect them to the home page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    // However, for this implementation, we'll just redirect to home. The modal will appear.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
