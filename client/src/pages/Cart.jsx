

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeCart, decreaseQty } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="flex-1 bg-white p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b py-4 items-center"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-28 h-28 object-contain"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-green-600 font-bold">₹ {item.price}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 bg-gray-300 rounded"
                    onClick={() => dispatch(decreaseQty(item.id))}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="px-2 bg-gray-300 rounded"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-red-500 text-sm mt-2"
                  onClick={() => dispatch(removeCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹ {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <hr />

        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total</span>
          <span>₹ {subtotal.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-yellow-400 mt-6 py-2 rounded-lg hover:bg-yellow-500"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
