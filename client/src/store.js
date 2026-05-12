import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"; //any name instead of cartReducer
import wish from "./features/wishlist/wishlistSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wish,
  },
});