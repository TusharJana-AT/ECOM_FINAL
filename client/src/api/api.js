import axios from "axios";
import { toast } from "react-toastify";

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
//////////////////////////////











//wishList

