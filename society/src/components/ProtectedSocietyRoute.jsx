import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAdminStore } from "../store/admin.store";

const ProtectedSocietyRoute = ({ children }) => {
  const { isAuthenticated, admin, loading, hasChecked, checkAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🔥 WAIT until auth check finishes
  if (!hasChecked || loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || admin?.role !== "society-admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedSocietyRoute;
