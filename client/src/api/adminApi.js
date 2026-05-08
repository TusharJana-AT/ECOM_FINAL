import { api } from "./api";

export const updateUserRole = (id, data) => {
  return api.put(`/admin/updateUser/${id}`, data, { showSuccessToast: true });
};

export const getAllUser = () => {
  return api.get("/admin/allUsers");
};

export const deleteUser = (userId) => {
  return api.delete(`/admin/deleteUser/${userId}`, { showSuccessToast: true });
};

export const getDashboardStats = () => {
  return api.get("/admin/dashboard");
};

export const getAllOrders=()=>{
    return api.get("/orders/admin");
}

export const updateDeliveryStatus=(id,status)=>{
    return api.put(`/orders/${id}/status`, { status });
}

export const updatePaymentMode=(id,paymentStatus)=>{
    return api.put(`/orders/${id}/paymentStatus`, { paymentStatus });
}