import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("user")?.role === "super-admin";
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;