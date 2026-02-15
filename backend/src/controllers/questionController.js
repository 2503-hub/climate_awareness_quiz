import Question from "../models/Questions.js";


export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: err.message,
      stack: err.stack 
    });
  }
};

/**
 * GET a single question by ID
 */
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).select("-__v");
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST a new question (Admin only)
 */
export const createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, difficulty } = req.body;

    const newQuestion = await Question.create({
      question: question.trim(),
      options: options.map(o => o.trim()),
      correctAnswer: correctAnswer.trim(),
      difficulty,
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    if (!updated) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating question" });
  }
};


// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting question" });
  }
};

// Validate answer
export const validateAnswer = async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect =
      selectedAnswer.trim().toLowerCase() ===
      question.correctAnswer.trim().toLowerCase();

    res.json({ correct: isCorrect });
  } catch (error) {
    res.status(500).json({ message: "Error validating answer" });
  }
};


