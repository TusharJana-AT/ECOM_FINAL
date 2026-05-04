// routes/GuestRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
