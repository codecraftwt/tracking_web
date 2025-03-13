// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData?.role_id;

  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return null; 
  } 

  if (!allowedRoles?.includes(userRole)) {
    return <Navigate to="/" replace />; 
  }

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
