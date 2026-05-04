// import { createSlice } from "@reduxjs/toolkit";


// const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     setWishlist: (state, action) => {
//       localStorage.setItem("wishlist", JSON.stringify(action.payload));
//       return action.payload;
//     },

//     addToWishlist: (state, action) => {
//       const exists = state.find(item => item.id === action.payload.id);

//       if (!exists) {
//         state.push(action.payload);
//         localStorage.setItem("wishlist", JSON.stringify(state));
//       }
//     },


//     removeFromWishlist: (state, action) => {
//       const updated = state.filter(item => item.id !== action.payload);
//       localStorage.setItem("wishlist", JSON.stringify(updated));
//       return updated;
//     },
//     clearWishlist: () => {
//       localStorage.removeItem("wishlist");
//       return [];
//     }
//   }
// });

// export const {
//   setWishlist,
//   addToWishlist,
//   removeFromWishlist,
//   clearWishlist
// } = wishlistSlice.actions;

// export default wishlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      return action.payload;
    },

    addToWishlist: (state, action) => {
      const exists = state.find(item => item.id === action.payload.id);

      if (!exists) {
        state.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },

    clearWishlist: () => {
      return [];
    }
  }
});

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;