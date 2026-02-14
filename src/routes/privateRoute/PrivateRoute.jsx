import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// optional spinner (you can replace)
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <span className="loading loading-spinner loading-lg text-[#703B3B]"></span>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🔄 while firebase checking user
  if (loading) {
    return <LoadingScreen />;
  }

  // 🔒 not logged in → redirect
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ allowed
  return children;
};

export default PrivateRoute;
