// routes/CheckoutGuard.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckoutRoute = ({ children }) => {
  const cart = useSelector((state) => state.cart);

  if (cart.length === 0) {
    return <Navigate to="/cart" />;
  }

  return children;
};

export default CheckoutRoute;