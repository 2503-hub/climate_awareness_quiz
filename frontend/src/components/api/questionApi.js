// src/api/questionApi.js
import { axiosInstance } from "./apiClient";

export const fetchAllQuestions = async () => {
const res = await axiosInstance.get("/questions/all");
  return res.data;
};

export const createQuestion = async (data) => {
  const res = await axiosInstance.post("/questions", data);
  return res.data;
};

export const updateQuestion = async (id, data) => {
  const res = await axiosInstance.put(`/questions/${id}`, data);
  return res.data;
};

export const deleteQuestionById = async (id) => {
  const res = await axiosInstance.delete(`/questions/${id}`);
  return res.data;
};
