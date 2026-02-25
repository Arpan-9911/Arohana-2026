// services/qr.service.js
import api from "./api"; // your axios instance

export const validateQrToken = async (token) => {
  const response = await api.get(`/qr/validate/${token}`);
  return response.data;
};
