import { api } from "./api";


export const getProducts = () => {
  return api.get("/products", { skipToast: true });
};

export const getSingleProducts = (id) => {
  return api.get(`/products/${id}`);
};

export const createProduct = (data) => {
  return api.post("/products", data, { showSuccessToast: true });
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`, { showSuccessToast: true });
};

export const editProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};