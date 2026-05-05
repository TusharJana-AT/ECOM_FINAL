import { useEffect, useState } from "react";
import { getWish, removeWish } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await getWish();
        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      await removeWish(productId);

      setWishlist((prev) =>
        prev.filter((item) => item.id !== productId)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="text-center mt-10 text-gray-500">
  //       Loading wishlist...
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-6xl mx-auto p-4">

      <h1 className="text-2xl font-bold mb-6 text-center">
        WISHLIST
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No items in wishlist</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            const isInCart = cartItems.some(
              (cart) => cart.id === item.id
            );

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-40 object-contain mb-3"
                />

                <h3 className="font-semibold text-lg mb-1">
                  {item.name}
                </h3>

                <p className="text-green-600 font-medium mb-3">
                  ₹ {item.price}
                </p>

                <div className="mt-auto flex gap-2">

                  <button
                    className={`flex-1 py-1 rounded text-white ${
                      isInCart
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-amber-500 hover:bg-amber-600"
                    }`}
                    onClick={() => dispatch(addToCart(item))}
                    disabled={isInCart}
                  >
                    {isInCart ? "Added" : "Add"}
                  </button>

                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={removingId === item.id}
                    className="flex-1 py-1 rounded text-xl"
                  >
                    {removingId === item.id ? "Removing..." : "❤️"}
                  </button>
                    
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;