import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllQuestions } from "./api/quizApi";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sprout, TreePine, Globe, PartyPopper } from "lucide-react";
import "../styles/Quiz.css";

export default function Quiz() {
  const navigate = useNavigate();

  // --- 1. State Hooks ---
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // --- 2. Helper Functions (Defined before use) ---
  
  const getBadge = (percentage) => {
    if (percentage <= 50) return { label: "Rising Seedling", Icon: Sprout, color: "#4caf50" };
    if (percentage <= 80) return { label: "Nature Protector", Icon: TreePine, color: "#2e7d32" };
    return { label: "Climate Guardian", Icon: Globe, color: "#1565c0" };
  };

  const saveQuizResult = useCallback((finalScore, totalQuestions) => {
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    const newResult = {
      date: new Date().toISOString(),
      score: finalScore,
      total: totalQuestions,
      percentage,
      badge: getBadge(percentage),
    };

    const existingResults = JSON.parse(localStorage.getItem("quizHistory")) || [];
    existingResults.push(newResult);
    localStorage.setItem("quizHistory", JSON.stringify(existingResults));
  }, []);

  // --- 3. Effects ---
  useEffect(() => {
    const loadQuestions = async () => {
      const saved = localStorage.getItem("quizQuestions");
      if (saved) {
        setQuestions(JSON.parse(saved));
        setLoading(false);
      } else {
        try {
          const data = await fetchAllQuestions();
          setQuestions(data || []);
          if (data && data.length > 0) {
            localStorage.setItem("quizQuestions", JSON.stringify(data));
          }
        } catch (err) {
          console.error("Failed to load questions", err);
        } finally {
          setLoading(false);
        }
      }
    };
    loadQuestions();
  }, []);

  // --- 4. Event Handlers ---
  const handleAnswer = (answer) => {
    if (locked || selectedAnswer || !questions[index]) return;

    setLocked(true);
    setSelectedAnswer(answer);
    const currentQuestion = questions[index];

    const isCorrect = answer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    setCorrectAnswer(currentQuestion.correctAnswer);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => setLocked(false), 700);
  };

  const handleNextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
    } else {
      // Important: Pass current score because state updates are async
      saveQuizResult(score, questions.length);
      setFinished(true);
    }
  };

  // --- 5. Conditional Rendering (Order Matters!) ---

  if (loading) return <div className="quiz-container"><p className="quiz-loading">Loading quiz…</p></div>;

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const badge = getBadge(percentage);
    return (
      <div className="quiz-container">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="quiz-result">
          <h2>Quiz Completed <PartyPopper className="text-green-500" size={32} /></h2>
          <div className="badge-display" style={{ color: badge.color }}>
             <badge.Icon size={48} />
             <p>Rank: {badge.label}</p>
          </div>
          <p>Score: <strong>{score}</strong> / {questions.length}</p>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={18} /> Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  // Final Guard: If questions are empty after loading
  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        <p>No questions available.</p>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  const question = questions[index];
  const progressPercent = ((index + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={18} /> Dashboard
      </button>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="quiz-progress-text">
        Question {index + 1} / {questions.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question._id || index}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="quiz-card"
        >
          <h3 className="quiz-question">{question.question}</h3>
          <div className="quiz-options">
            {question.options.map((option) => (
              <button
                key={option}
                className={`quiz-option 
                  ${selectedAnswer === option && option === correctAnswer ? "correct" : ""}
                  ${selectedAnswer === option && option !== correctAnswer ? "wrong" : ""}
                  ${selectedAnswer && option === correctAnswer ? "correct" : ""} 
                `}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <button className="next-btn" onClick={handleNextQuestion}>
              {index + 1 === questions.length ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}