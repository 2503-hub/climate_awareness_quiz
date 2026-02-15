// src/api/reportApi.js
import { axiosInstance } from "./apiClient";

export const fetchReports = async (params) => {
  const res = await axiosInstance.get("/reports", { params });
  return res.data;
};
