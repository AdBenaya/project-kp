// frontend/src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, admin }) => {
  const { auth } = useContext(AuthContext);

  // Jika token tidak ada, arahkan ke halaman login
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  // Jika rute ini untuk admin dan user bukan admin, arahkan ke halaman utama atau yang sesuai
  if (admin && auth.user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Jika semua pemeriksaan lulus, render anak komponen
  return children;
};

export default ProtectedRoute; // Default export

