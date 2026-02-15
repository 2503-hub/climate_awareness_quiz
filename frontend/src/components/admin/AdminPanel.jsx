import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Added useEffect and useState
import { 
  User, 
  ClipboardList, 
  BarChart2 
} from "lucide-react"; 
import '../../styles/AdminPanel.css';

const adminCards = [
  {
    title: "Manage Users",
    description: "Add, edit, or deactivate user accounts",
    icon: <User size={48} />, 
    route: "/admin/manage-users",
  },
  {
    title: "Manage Questions",
    description: "Create, edit or delete quiz questions",
    icon: <ClipboardList size={48} />,
    route: "/admin/manage-questions",
  },
  {
    title: "Generate Reports",
    description: "View and export system reports",
    icon: <BarChart2 size={48} />,
    route: "/admin/reports",
  },
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // null = checking, false = denied, true = allowed

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAdmin(false);
      return;
    }

    try {
      // MANUAL DECODE: No library needed!
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const decoded = JSON.parse(jsonPayload);
      
      if (decoded.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Token decode failed", error);
      setIsAdmin(false);
    }
  }, []);

  // While checking, show nothing or a loader
  if (isAdmin === null) return null;

  // Block non-admins
  if (isAdmin === false) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "1.2rem", color: "red" }}>
          Access denied. You do not have permission to view this page.
        </p>
        <button onClick={() => navigate("/")} style={{ marginTop: "1rem", cursor: "pointer" }}>
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="cards-container">
        {adminCards.map((card) => (
          <div
            key={card.title}
            className="admin-card"
            onClick={() => navigate(card.route)}
          >
            <div className="card-icon-wrapper">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;