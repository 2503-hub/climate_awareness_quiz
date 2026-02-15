import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react"; // Added useEffect
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,  
  ClipboardList,   
  LogOut, 
  Play, 
  CheckCircle2,   
  BarChart2,
  Lightbulb,
  Menu,
  ShieldCheck, // Added for Admin icon
  MenuIcon
} from 'lucide-react';
import '../styles/Dashboard.css';
import { useAuth } from "../context/AuthContext";
import { fetchAllQuestions } from "./api/questionApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Assuming logout is in your context
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(0); // Dynamic question count

  // 1. Fetch live data from backend on mount
  useEffect(() => {
    const getQuizStats = async () => {
      try {
        const questions = await fetchAllQuestions();
        setQuestionCount(questions.length);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    getQuizStats();
  }, []);

  // 2. Proper logout handler (using Context + LocalStorage cleanup)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (logout) logout(); 
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button onClick={() => setIsSidebarOpen(true)}>
          <MenuIcon size={24} />
        </button>
        <h3>EcoMind</h3>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <CheckCircle2 size={24} />
          </div>
          <span>EcoMind</span>
        </div>
        
        <nav className="sidebar-nav">
          <button onClick={() => navigate("/dashboard")} className="nav-item active">
            <LayoutDashboard size={20}/> 
            <span>Dashboard</span>
          </button>

          <button onClick={() => navigate("/funfacts")} className="nav-item">
            <Lightbulb size={20}/> 
            <span>Fun Fact</span>
          </button>

          <button onClick={() => navigate("/results")} className="nav-item">
            <BarChart2 size={20}/> 
            <span>Results</span>
          </button>

          {/*ADMIN SECTION - Only visible if backend user.role is 'admin' */}
          {user?.role === "admin" && (
            <div className="admin-menu-group">
              <p className="sidebar-label">Administration</p>
              <button
                className="nav-item admin-item"
                onClick={() => {
                  setIsSidebarOpen(false);
                  navigate("/admin");
                }}
              >
                <ShieldCheck size={20} color="#3b82f6" />
                <span>Admin Panel</span>
              </button>
            </div>
          )}
        </nav>

        <button 
          className="logout-btn" 
          onClick={() => {
            handleLogout();
            setIsSidebarOpen(false);
          }}
        >
          <LogOut size={20}/> 
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div 
            key="start-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="start-card"
          >
            <div className="card-badge">EcoBrain Quiz Available</div>
            <h1>Test your climate knowledge. Shape a better future</h1>
            <p>
              Discover how much you really know about climate change and learn
              simple actions that make a difference.
            </p>
            
            <div className="stats-row">
              <div className="stat-box">
                <ClipboardList size={18} className="blue-icon" />
                {/* 3. Display Dynamic Count from Backend */}
                <span>{questionCount > 0 ? `${questionCount} Questions` : "Loading quiz..."}</span>
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={() => navigate("/quiz")}
            >
              <Play size={18} fill="currentColor" /> 
              Start Quiz
            </button>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;