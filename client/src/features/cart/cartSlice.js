import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { clearWishlist } from "../wishlist/wishlistSlice";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find((item) => item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeCart: (state, action) => {
      const updated = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    },

    decreaseQty: (state, action) => {
      const item = state.find((i) => i.id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(state));
        } else {
          const updated = state.filter((i) => i.id !== action.payload);
          localStorage.setItem("cart", JSON.stringify(updated));
          return updated;
        }
      }
    },
    clearCart: () => {

      localStorage.removeItem("cart");

      
      return [];
    },
  },
});

export const { addToCart, removeCart, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
