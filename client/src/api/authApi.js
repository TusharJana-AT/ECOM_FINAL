import { api } from "./api";

export const loginUser = (data) =>
  api.post("/auth/login", data, { showSuccessToast: true }); //, successMessage: "Login successful "
export const registerUser = (data) =>
  api.post("/auth/register", data, { showSuccessToast: true });
export const getUser = () => {
  return api.get("/auth/me");
};
export const editProfile = (data) => {
  return api.put("/auth/edit-user", data, { showSuccessToast: true });
};
 