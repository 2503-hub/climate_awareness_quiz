const API_URL = "http://localhost:4000/api/questions";

/**
 * Fetch all quiz questions
 * @returns {Array} questions
 */
export const fetchAllQuestions = async () => {
  try {
    const res = await fetch(`${API_URL}/all`);

    if (!res.ok) {
      throw new Error("Failed to fetch all questions");
    }

    return await res.json();
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
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch question by ID");
    }

    return await res.json();
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
    const res = await fetch(`${API_URL}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId, selectedAnswer }),
    });

    if (!res.ok) {
      throw new Error("Failed to validate answer");
    }

    return await res.json(); // { correct: true | false }
  } catch (err) {
    console.error("Error validating answer:", err);
    return { correct: false };
  }
};
