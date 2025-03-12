// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return null; 
  } 

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
