import api from "./api";

export const loginAdmin = async (data) => {
  const response = await api.post("/auth/admin/login", data);
  return response.data;
}

export const logoutAdmin = async () => {
  const response = await api.post("/auth/admin/logout");
  localStorage.removeItem("user");
  return response.data;
}

export const checkAdminAuth = async () => {
  const response = await api.get("/auth/admin/check");
  return response.data;
};
