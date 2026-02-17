import axios from "axios";
import { useAdminStore } from "../store/admin.store";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAdminStore.getState();
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;