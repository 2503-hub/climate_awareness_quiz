import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import FunFacts from "./components/FunFact";
import ManageQuestions from "./components/admin/ManageQuestions";
import ManageUsers from "./components/admin/ManageUsers";
import Reports from "./components/admin/Report";
import AdminPanel from "./components/admin/AdminPanel";
import { useAuth } from "./context/AuthContext";

// Protected Route component
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) 
    return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<AuthForm />} />

      {/* Authenticated user routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/funfacts" element={<FunFacts />} />
      </Route>

     {/* Admin routes */}
     <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
     <Route path="/admin" element={<AdminPanel />} />
     <Route path="/admin/manage-users" element={<ManageUsers />} />
     <Route path="/admin/manage-questions" element={<ManageQuestions />} />
     <Route path="/admin/reports" element={<Reports />} />
     </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
