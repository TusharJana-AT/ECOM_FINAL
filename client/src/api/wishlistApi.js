import { api } from "./api";

export const addWish = (productId) => {
  // console.warn("ADD WISHLIST : ",productId);
  
  return api.post("/wishlist", { productId }, { showSuccessToast: true },);
};

export const getWish = () => {
  return api.get("/wishlist",{ skipToast: true },);
};

export const removeWish = (productId) => {
  return api.delete(`/wishlist/${productId}`, { showSuccessToast: true });
};