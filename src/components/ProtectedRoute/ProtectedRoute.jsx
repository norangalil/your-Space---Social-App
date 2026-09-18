import React from 'react'
import { Navigate } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../../pages/context/user.context';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);

  if (!token) {
    return <Navigate to="/Login" />;
  }

  return children;
}