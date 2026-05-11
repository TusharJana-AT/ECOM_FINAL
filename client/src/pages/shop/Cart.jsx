import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="flex-1 bg-white p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty
          </p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))
        )}
      </div>

      <CartSummary
        subtotal={subtotal}
        onCheckout={() => navigate("/checkout")}
      />
    </div>
  );
};

export default Cart;