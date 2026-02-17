import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../store/user.store"

const ProtectedRoute = () => {
  const { isAuthenticated, loading, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
