import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      {
        questionText: String,
        options: [String],
        correctAnswer: String,
        userAnswer: String, // optional, if you want to track the user's answers
      },
    ],
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      default: "general",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
