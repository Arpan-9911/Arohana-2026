import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("user")); 
  const isAuthenticated = user && user.role === "super-admin";

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />; // for now it is /login to see login page later change it to / only
}

export default PublicRoute;