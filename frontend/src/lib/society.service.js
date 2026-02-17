import api from "./api";

// Fetch all societies
export const getAllSocieties = async () => {
  const response = await api.get("/society");
  return response.data;
};
