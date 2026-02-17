import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAdminStore } from "../store/admin.store";

const ProtectedSocietyRoute = ({ children }) => {
  const { isAuthenticated, admin, loading, checkAuth } = useAdminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated || admin?.role !== "society-admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedSocietyRoute;
