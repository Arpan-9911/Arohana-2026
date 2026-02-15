import { Navigate } from "react-router-dom";

const ProtectedSocietyRoute = ({ children }) => {
  const isSocietyLoggedIn = localStorage.getItem("societyAdmin");

  if (!isSocietyLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedSocietyRoute;
