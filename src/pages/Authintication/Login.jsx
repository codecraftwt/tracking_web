import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../redux/slices/userSlice";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa"; 
import mainlogo from "./assets/Images/mainlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();
  const { login, setIsAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) return;

    setLoading(true);
    try {
      const response = await dispatch(
        loginUser({ data: { email, password } })
      ).unwrap();

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #4A90E2, #4A90E2, #4A90E2)",
        fontFamily: "'Poppins', sans-serif",
        padding: "0 20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src={mainlogo}
          alt="Netubia"
          style={{
            objectFit: "contain",
            height: "110px",
            marginBottom: "20px",
            maxWidth: "100%",
          }}
        />
        
        <p style={{ color: "#fff", fontSize: "26px", fontWeight: "600" }}>
          Welcome back!
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#555",
            marginBottom: "20px",
            fontWeight: "600",
            fontSize: "24px",
          }}
        >
          Please log in to continue.
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #A8D8FF",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "25px",
              borderRadius: "8px",
              border: "1px solid #A8D8FF",
              fontSize: "16px",
              boxSizing: "border-box",
              paddingRight: "40px",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "15px",
              top: "33%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash size={20} color="#777" />
            ) : (
              <FaEye size={20} color="#777" />
            )}
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: loading ? "#ccc" : "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "background-color 0.3s ease",
          }}
          disabled={loading}
        >
          {loading ? <FaSpinner size={20} className="spinner" /> : "Log in"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#777" }}>
          Forgot your password?{" "}
          <a
            href="/reset-password"
            style={{ color: "#5A67D8", fontWeight: "500" }}
          >
            Reset it here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
