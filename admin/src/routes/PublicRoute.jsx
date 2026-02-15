import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Navigate to="/login" replace /> : <Outlet />; // for now it is /login to see login page later change it to / only
}

export default PublicRoute;