import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const PublicRoute = () => {
  const { isAuthenticated } = useUserStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default PublicRoute;