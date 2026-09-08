import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return user ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
