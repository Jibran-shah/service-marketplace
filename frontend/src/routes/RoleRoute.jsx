import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AppLoader from "../components/AppLoader";
import { useMe } from "../hooks/api/auth/useMe";

export default function RoleRoute({ allowedRoles }) {
  const { isAuthenticated } = useSelector((state) => state.ui);

  const { data: user, isLoading } = useMe(isAuthenticated);

  if (isLoading) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
   // return <Navigate to="/login" replace />;
  }

  const role = user?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}