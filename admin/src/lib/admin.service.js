import api from "./api";

export const getSocieties = async () => {
  const response = await api.get("/admin/societies");
  return response.data;
};

export const createSociety = async (data) => {
  const response = await api.post("/admin/create-society", data);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const approveUser = async (id) => {
  const response = await api.patch(`/admin/users/${id}/approve`);
  return response.data;
};

export const rejectUser = async (id, reason) => {
  const response = await api.patch(`/admin/users/${id}/reject`, { reason });
  return response.data;
};

export const loginAdmin = async (data) => {
  const response = await api.post("/auth/admin/login", data);
  return response.data;
}

export const logoutAdmin = async () => {
  const response = await api.post("/auth/admin/logout");
  localStorage.removeItem("user");
  return response.data;
}
