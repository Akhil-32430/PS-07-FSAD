import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRole, children }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (session.role !== allowedRole) {
    return <Navigate to={`/${session.role}`} replace />;
  }

  return children;
}

export default ProtectedRoute;
