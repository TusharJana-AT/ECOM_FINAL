// routes/SuccessGuard.jsx
import { useLocation, Navigate } from "react-router-dom";

const SuccessGuard = ({ children }) => {
  const location = useLocation();

  if (!location.state?.orderId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default SuccessGuard;