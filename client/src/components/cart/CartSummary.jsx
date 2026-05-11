const CartSummary = ({ subtotal, onCheckout }) => {
  return (
    <div className="w-full lg:w-1/3 bg-white p-4 rounded-xl shadow h-fit">
      <h2 className="text-xl font-semibold mb-4">
        Order Summary
      </h2>

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
        onClick={onCheckout}
        className="w-full bg-yellow-400 mt-6 py-2 rounded-lg hover:bg-yellow-500"
      >
        Proceed to Buy
      </button>
    </div>
  );
};

export default CartSummary;