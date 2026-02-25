import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAdminStore } from "@/store/admin.store";

const ProtectedRoute = () => {
  const { isAuthenticated, admin, loading, hasChecked, checkAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ⛔ Wait until auth check completes
  if (!hasChecked || loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || admin?.role !== "super-admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;