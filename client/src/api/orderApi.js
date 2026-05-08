import { api } from "./api";

export const createOrder = (data) =>
  api.post("/orders", data, { showSuccessToast: true });

export const getOrders = (data) => {
  return api.get("/orders", { skipToast: true });
};
