import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addWish, removeWish } from "../../api/api";
import { useState } from "react";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/cart/wishlistSlice";
import { useAuth } from "../../auth/AuthContext";

const ProductCard = ({ product, handleDelete }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const isInCart = cartItems.some((item) => item.id === product.id);

  const { user } = useAuth();

  const wishlist = useSelector((state) => state.wishlist);
  // console.log("DATA",wishlist);

  const isWishListed = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = async () => {
    if (user?.role !== "user") return;
    try { 
      if (isWishListed) {
        console.log("ISWISH",isWishListed);
        
        // remove
        await removeWish(product.id);
        dispatch(removeFromWishlist(product.id));
      } else {
        // add
        await addWish(product.id);
        dispatch(addToWishlist(product));
      }
    } catch (err) {
      console.error(err);
    }
  };
  // const addWishlist = async () => {
  //   try {
  //     await addWish(product.id);
  //     console.log("added");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="border border-b-black rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-200 bg-white">
      <div className="bg-slate-100 flex items-center justify-center h-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        <div>
          <div className="bg-slate-200 flex justify-around p-3">
            <h4 className="text-xl">{product.name.slice(0, 15)}</h4>
            <p className="text-green-600 text-lg">₹ {product.price}</p>
          </div>
        </div>

        <div className="flex justify-between items-center p-2 m-1">
          {user?.role !== "admin" && (
            <button
              className={`bg-amber-400 rounded-xl m-2 p-2 cursor-pointer ${
                isInCart
                  ? "bg-gray-400 cursor-not-allowed"
                  : "hover:bg-amber-600"
              }`}
              onClick={() => {
                if (user?.role !== "admin") {
                  dispatch(addToCart(product));
                }
              }}
              disabled={isInCart}
            >
              {isInCart ? "Added" : "Add Cart"}
            </button>
          )}

          <Link
            to={`/product/${product.id}`}
            className="text-lg text-blue-600 hover:underline"
          >
            Details
          </Link>
          {user?.role !== "admin" && (
            <button
              className="text-xl hover:scale-110 transition "
              onClick={toggleWishlist}
            >
              {isWishListed ? "❤️" : "🤍"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
