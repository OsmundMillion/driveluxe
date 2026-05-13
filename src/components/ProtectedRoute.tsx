import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole: "customer" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
  const { user } = useAuth();

  // Not logged in → send to sign in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Logged in but wrong role → send to home
  if (user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;