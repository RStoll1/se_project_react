import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  redirectPath = "/",
  children,
}) {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}
