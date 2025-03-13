import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Prevents flashing of protected content

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
