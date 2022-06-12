

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../components/Firebase/Firebase.config";

const RequiredAuth = ({ children }) => {
  const location = useLocation();
  if (!auth.currentUser) {
    <Navigate to="/login" state={{ from: location }} replace />;
    return <div>RequiredAuth</div>;
  }
  return children;
};

export default RequiredAuth;
