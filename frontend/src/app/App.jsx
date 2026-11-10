import { useEffect } from "react";
import { useSelector } from "react-redux";
import AppRoutes from "../routes/AppRoutes";
import AppLoader from "../components/AppLoader";
import { useAuthInit } from "../hooks/api/auth/useAuthInit";
import { connectSocket } from "../socket/socket.manager";

import { subscribePush } from "../utils/subscribePush";

subscribePush()

export default function App() {
  useAuthInit();

  const authLoading = useSelector((state) => state.ui.authLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;
    connectSocket();
  }, [isAuthenticated]);

  if (authLoading) {
    return <AppLoader />;
  }

  return <AppRoutes />;
}