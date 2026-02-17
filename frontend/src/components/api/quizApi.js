import { axiosInstance } from "./apiClient";

/**
 * Fetch all quiz questions
 * @returns {Array} questions
 */
export const fetchAllQuestions = async () => {
  try {
    const res = await axiosInstance.get("/questions/all");
    return res.data;
  } catch (err) {
    console.error("Error fetching all questions:", err);
    return []; // always return an array
  }
};

/**
 * Fetch a single question by ID
 * @param {string} id
 * @returns {Object|null} question
 */
export const fetchQuestionById = async (id) => {
  try {
    const res = await axiosInstance.get(`/questions/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching question ${id}:`, err);
    return null;
  }
};

/**
 * Validate an answer
 * @param {string} questionId
 * @param {string} selectedAnswer
 * @returns {Object} { correct: boolean }
 */
export const validateAnswer = async (questionId, selectedAnswer) => {
  try {
    const res = await axiosInstance.post("/questions/validate", {
      questionId,
      selectedAnswer,
    });
    return res.data; // { correct: true | false }
  } catch (err) {
    console.error("Error validating answer:", err);
    return { correct: false };
  }
};
