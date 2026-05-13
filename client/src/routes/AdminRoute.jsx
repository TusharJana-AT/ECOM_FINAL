import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const AdminRoute = () => {
  const { user ,loading} = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;