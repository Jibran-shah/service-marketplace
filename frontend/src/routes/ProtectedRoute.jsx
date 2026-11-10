import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AppLoader from "../components/AppLoader";

export default function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useSelector(
    (state) => state.ui
  );

  if (authLoading) {
    return <AppLoader />;
  }

  if (!isAuthenticated) {
    //return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}