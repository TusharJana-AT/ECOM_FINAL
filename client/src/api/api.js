import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// axios.get("/api/data", {
//   headers: { Authorization: `Bearer ${token}` }
// });

//OR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// import { toast } from "sonner";
import { toast } from "react-toastify";

api.interceptors.response.use(
  (response) => {
    // Show success toast only when needed
    if (response.config?.showSuccessToast) {
      const message =
        response.config.successMessage ||
        response.data?.message ||
        "Action successful";

      toast.success(message, {
        theme: "colored",
      });
    }

    return response;
  },

  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    const status = error.response?.status;

    // Avoid toast if explicitly disabled
    if (!error.config?.skipToast && status !== 401) {
      toast.error(message, {
        theme: "colored",
      });
    }

    // Unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
    } 
 
    //  Forbidden
    if (status === 403) {
      toast.error(message, {
        theme: "colored",
      });
    }

    return Promise.reject(error);
  },
);

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

export const loginUser = (data) =>
  api.post("/auth/login", data, { showSuccessToast: true }); //, successMessage: "Login successful 🎉"
export const registerUser = (data) =>
  api.post("/auth/register", data, { showSuccessToast: true });

export const createOrder = (data) =>
  api.post("/orders", data, { showSuccessToast: true });
export const getOrders = (data) => {
  return api.get("/orders", { skipToast: true });
};

export const getUser = () => {
  return api.get("/auth/me");
};

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

//wishList

export const addWish = (productId) => {
  console.warn("ADD WISHLIST : ",productId);
  
  return api.post("/wishlist", { productId }, { showSuccessToast: true },);
};

export const getWish = () => {
  return api.get("/wishlist",{ skipToast: true },);
};

export const removeWish = (productId) => {
  return api.delete(`/wishlist/${productId}`, { showSuccessToast: true });
};