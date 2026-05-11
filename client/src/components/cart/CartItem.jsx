import { useDispatch } from "react-redux";
import { addToCart, decreaseQty, removeCart } from "../../features/cart/cartSlice";


const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 border-b py-4 items-center">
      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-28 object-contain"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>

        <p className="text-green-600 font-bold">
          ₹ {item.price}
        </p>

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
  );
};

export default CartItem;