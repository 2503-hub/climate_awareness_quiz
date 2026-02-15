import { useEffect, useState } from "react";
import { Sprout, TreePine, Globe, Trash2, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Results() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(stored);
  }, []);

  // Badge Logic
  const getBadge = (percentage) => {
    if (percentage >= 90)
      return { label: "Eco Master", Icon: Globe, color: "#2c9c35" };
    if (percentage >= 70)
      return { label: "Tree Protector", Icon: TreePine, color: "#1a9c3b" };
    return { label: "Eco Starter", Icon: Sprout, color: "#0bac21" };
  };

  // Clear all progress
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all quiz progress?")) {
      localStorage.removeItem("quizHistory");
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="results-container">
        <div className="clear-history-container">
          <button className="clear-btn" onClick={clearHistory}>
            <Trash2 size={20} color="red" /> Clear History
          </button>
        </div>
         <button
       className="back-btn"
        onClick={() => navigate("/dashboard")}
        >
            <ChevronLeft size={18} />
             Dashboard
             </button>
        <h2>No results available.</h2>
        <p>Complete a quiz to see your progress!</p>
        <style>{styles}</style>
      </div>
    );
  }

  const totalQuizzes = history.length;
  const highestScore = Math.max(...history.map((h) => h.percentage));
  const averageScore = Math.round(
    history.reduce((acc, curr) => acc + curr.percentage, 0) / totalQuizzes
  );

  return (
    <div className="results-container">
      <div className="clear-history-container">
        <button className="clear-btn" onClick={clearHistory}>
          <Trash2 size={20} color="red" /> Clear History
        </button>
      </div>
      <button
       className="back-btn"
        onClick={() => navigate("/dashboard")}
        >
            <ChevronLeft size={18} />
             Dashboard
             </button>
      <h2 className="title">My Progress</h2>

      <div className="summary-card">
        <div>
          <span>Total Quizzes</span>
          <strong>{totalQuizzes}</strong>
        </div>
        <div>
          <span>Highest Score</span>
          <strong>{highestScore}%</strong>
        </div>
        <div>
          <span>Average Score</span>
          <strong>{averageScore}%</strong>
        </div>
      </div>

      <h3 className="history-title">Quiz History</h3>

      <div className="history-wrapper">
        {history.map((item, index) => {
          const badge = getBadge(item.percentage);
          const BadgeIcon = badge.Icon;

          return (
            <div key={index} className="history-card">
              <div className="history-header">
                <span>{new Date(item.date).toLocaleDateString()}</span>
                <span className="percentage">{item.percentage}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <div className="badge-display">
                <BadgeIcon size={20} color={badge.color} />
                <span>{badge.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
.results-container {
  padding: 2rem;
  min-height: 100vh;
  background: #f4f8ff;
  animation: fadeIn 0.6s ease-in-out;
  position: relative;
}

.clear-history-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  color: red;
  transition: transform 0.2s ease;
}

.clear-btn:hover {
  transform: scale(1.05);
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
}

.summary-card {
  display: flex;
  gap: 1.5rem;
  background: #eaf2ff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.08);
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.summary-card div {
  flex: 1;
  min-width: 150px;
}

.summary-card span {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
}

.summary-card strong {
  font-size: 1.4rem;
  color: rgb(67, 238, 172);
}

.history-title {
  margin-bottom: 1rem;
  color: #13b177;
}

.history-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-card {
  background: #ffffff;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(30, 58, 138, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: slideUp 0.5s ease forwards;
}

.history-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(30, 58, 138, 0.12);
}

.history-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1e3a8a;
}

.percentage {
  color: #2563eb;
}

.progress-bar {
  height: 8px;
  background: #e0e7ff;
  border-radius: 6px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #34a53a, #33a163);
  border-radius: 6px;
  transition: width 0.6s ease-in-out;
}

.badge-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.6rem;
  font-weight: 500;
  color: #2d9219;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .summary-card {
    flex-direction: column;
  }
}
`;
