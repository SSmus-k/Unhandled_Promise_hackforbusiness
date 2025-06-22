import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

export default function ProtectedRoute({ children }) {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
