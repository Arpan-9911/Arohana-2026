import api from "./api";

export const loginUser = async (data) => {
  const response = await api.post("/auth/user/login", data);
  return response.data;
}

export const checkUserAuth = async () => {
  const response = await api.get("/auth/user/check");
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/user/register",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/user/logout");
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/auth/user/profile");
  return response.data;
};

export const getUserParticipation = async () => {
  const response = await api.get("/auth/users/me/participation");
  return response.data;
};