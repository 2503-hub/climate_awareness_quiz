// src/api/userApi.js
import { axiosInstance } from "./apiClient";

export const fetchAllUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axiosInstance.put(`/users/${id}`, data);
  return res.data;
};

export const deactivateUserById = async (id) => {
  const res = await axiosInstance.put(`/users/deactivate/${id}`);
  return res.data;
};
