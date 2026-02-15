import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, UserMinus } from "lucide-react";
import { fetchAllUsers, updateUser, deactivateUserById } from "../api/userApi"; // API helpers

export default function ManageUsers({ currentUser }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Load users
  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Edit user
  const handleEdit = (user) => {
    setEditing(user);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editing._id, form);
      setEditing(null);
      setForm({ name: "", email: "", role: "user" });
      loadUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user!");
    }
  };

  // Deactivate user (prevent self-deactivation)
  const handleDeactivate = async (id) => {
    if (id === currentUser._id) {
      alert("You cannot deactivate yourself!");
      return;
    }

    if (!window.confirm("Are you sure you want to deactivate this user?")) return;

    try {
      await deactivateUserById(id);
      loadUsers();
    } catch (err) {
      console.error("Failed to deactivate user:", err);
      alert("Failed to deactivate user!");
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <p className="loading">Loading users…</p>;

  return (
    <div className="manage-container">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        <ArrowLeft size={20} />
        <span>Dashboard</span>
      </button>

      <h2>Manage Users</h2>

      {/* Edit form */}
      {editing && (
        <form className="user-form" onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
          />
          <select name="role" value={form.role} onChange={handleInputChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Update User <Edit size={16} /></button>
        </form>
      )}

      {/* Users list */}
      <div className="users-list">
        {currentUsers.map((user) => (
          <div key={user._id} className="user-card">
            <p><strong>{user.name}</strong> ({user.email})</p>
            <p>Role: {user.role}</p>
            <p>Status: {user.isActive ? "Active" : "Inactive"}</p>
            <div className="actions">
              <button onClick={() => handleEdit(user)}>
                <Edit size={16} /> Edit
              </button>
              {user.isActive && (
                <button onClick={() => handleDeactivate(user._id)} className="deactivate-btn">
                  <UserMinus size={16} /> Deactivate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {users.length > usersPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}

      <style>{styles}</style>
    </div>
  );
}

const styles = `
.manage-container {
  padding: 2rem;
  min-height: 100vh;
  background: #e6f4f1;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #d1f2e0;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
}
h2 {
  color: #356859;
  margin-bottom: 1.5rem;
}
.user-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: #d1f2e0;
  padding: 1rem;
  border-radius: 12px;
}
.user-form input, .user-form select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #a3d9c1;
}
.user-form button {
  background: #356859;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.users-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.user-card {
  background: #f0fcf7;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(53, 104, 89, 0.08);
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
.actions .deactivate-btn {
  background: #ef4444;
  color: white;
}
.pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.pagination button {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: #356859;
  color: white;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .user-form, .users-list {
    font-size: 0.9rem;
  }
  .back-btn {
    padding: 0.3rem 0.6rem;
  }
}
`;
