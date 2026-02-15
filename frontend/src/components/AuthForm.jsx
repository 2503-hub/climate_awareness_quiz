import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Chrome, Facebook, Github, Linkedin, Mail, Home } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import '../styles/AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '', password: '', email: '', address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "" : "active"}`}>
        
        {/* --- Registration Form (Right Side) --- */}
        <div className="form-container sign-up">
          <form onSubmit={handleAuth}>
            <h2>Register</h2>
            <div className="input-group">
              <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
              <User className="icon" size={20} />
            </div>
            <div className="input-group">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <Mail className="icon" size={20} />
            </div>
            <div className="input-group">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <Lock className="icon" size={20} />
            </div>
            <div className="input-group">
              <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
              <Home className="icon" size={20} />
            </div>
            <button type="submit" className="btn-primary">Sign Up</button>
          </form>
        </div>

        {/* --- Login Form (Left Side) --- */}
        <div className="form-container sign-in">
          <form onSubmit={handleAuth}>
            <h2>Login</h2>
            <div className="input-group">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <Mail className="icon" size={20} />
            </div>
            <div className="input-group">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <Lock className="icon" size={20} />
            </div>
            <button type="submit" className="btn-primary">Login</button>
            <div className="social-container">
              <div className="social-icon"><Chrome size={20}/></div>
              <div className="social-icon"><Facebook size={20}/></div>
              <div className="social-icon"><Github size={20}/></div>
              <div className="social-icon"><Linkedin size={20}/></div>
            </div>
          </form>
        </div>

        {/* --- Sliding Overlay Panel --- */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h2>Welcome Back!</h2>
              <p>Already have an account?</p>
              <button className="btn-outline" onClick={() => setIsLogin(true)}>Login</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h2>Hello Welcome!</h2>
              <p>Don't have an account?</p>
              <button className="btn-outline" onClick={() => setIsLogin(false)}>Register</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;