import api from "./api";

export const loginAdmin = async (data) => {
  const response = await api.post("/auth/admin/login", data);
  return response.data;
}

export const logoutAdmin = async () => {
  const response = await api.post("/auth/admin/logout");
  return response.data;
}

export const checkAdminAuth = async () => {
  const response = await api.get("/auth/admin/check");
  return response.data;
};

export const getSocietyEvents = async () => {
  const response = await api.get("/admin/events");
  return response.data;
};

export const createEvent = async (formData) => {
  const response = await api.post("/admin/events", formData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/admin/events/${id}`);
  return response.data;
};

export const getEventParticipants = async (eventId) => {
  const response = await api.get(`/admin/events/${eventId}/participants`);
  return response.data;
};
