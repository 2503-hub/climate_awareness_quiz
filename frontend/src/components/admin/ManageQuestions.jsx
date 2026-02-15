import { useEffect, useState } from "react";
import { Trash2, Edit, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// API helper functions
import {
  fetchAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestionById,
} from "../api/questionApi";

export default function ManageQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // question being edited
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  // Load questions function moved outside useEffect
  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await fetchAllQuestions();
      setQuestions(data);
    } catch (err) {
      console.error("Failed to load questions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load questions on component mount
  useEffect(() => {
    loadQuestions();
  }, []);

  // Handle form input changes
  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "option" && index !== null) {
      const newOptions = [...form.options];
      newOptions[index] = value;
      setForm({ ...form, options: newOptions });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle form submit for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateQuestion(editing._id, form);
      } else {
        const res = await createQuestion(form);
        if (!res._id) throw new Error("Failed to create question");
      }

      setEditing(null);
      setForm({ question: "", options: ["", "", "", ""], correctAnswer: "" });
      await loadQuestions(); // refresh question list
    } catch (err) {
      console.error("Error saving your question:", err);
      alert("Error saving your question. Check console for details.");
    }
  };

  const handleEdit = (question) => {
    setEditing(question);
    setForm({
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await deleteQuestionById(id);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Failed to delete question!");
    }
  };

  if (loading) return <p className="loading">Loading questions…</p>;

  return (
    <div className="manage-container">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={20} />
        <span>Dashboard</span>
      </button>

      <h2>Manage Questions</h2>

      {/* Form to add/edit question */}
      <form className="question-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleInputChange}
          placeholder="Question text"
          required
        />

        {form.options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            name="option"
            value={opt}
            onChange={(e) => handleInputChange(e, idx)}
            placeholder={`Option ${idx + 1}`}
            required
          />
        ))}

        <input
          type="text"
          name="correctAnswer"
          value={form.correctAnswer}
          onChange={handleInputChange}
          placeholder="Correct Answer"
          required
        />
        <button type="submit" className="submit-btn">
          {editing ? "Update Question" : "Add Question"} <Plus size={16} />
        </button>
      </form>

      {/* List of questions */}
      <div className="questions-list">
        {questions.map((q) => (
          <div key={q._id} className="question-card">
            <p className="question-text">{q.question}</p>
            <div className="options">
              {q.options.map((opt, idx) => (
                <span key={idx} className={opt === q.correctAnswer ? "correct" : ""}>
                  {opt}
                </span>
              ))}
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(q)}>
                <Edit size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(q._id)} className="delete-btn">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
.manage-container {
  padding: 2rem;
  min-height: 100vh;
  background: #f0f7ff;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #dbeafe;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
}
h2 {
  color: #1e40af;
  margin-bottom: 1.5rem;
}
.question-form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
  background: #e0f2fe;
  padding: 1rem;
  border-radius: 12px;
}
.question-form input {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #93c5fd;
}
.submit-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.questions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.question-card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.08);
}
.question-text {
  font-weight: 500;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}
.options span {
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: #dbeafe;
}
.options .correct {
  background: #22c55e;
  color: white;
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.actions button {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.actions .delete-btn {
  background: #ef4444;
  color: white;
}
@media (max-width: 768px) {
  .question-form input {
    font-size: 0.9rem;
  }
  .submit-btn {
    font-size: 0.9rem;
  }
}
`;
