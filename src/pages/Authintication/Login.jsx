import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../redux/slices/userSlice";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import logo11 from "../../../src/assets/Images/logo11.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await dispatch(
        loginUser({ data: { email, password } })
      ).unwrap();

      if (response.token) {
        login(response.token, response.user);

        if (response.user.role_id === 1) {
          navigate("/admindashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(response.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3B82F6, #2563EB)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <motion.form
        onSubmit={handleLogin}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <motion.div
          variants={itemVariants}
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={logo11}
            alt="mainlogo"
            style={{ height: "90px", marginBottom: "5px" }}
          />
          <motion.h1
            variants={itemVariants}
            style={{ color: "#111827", fontWeight: 600, fontSize: "34px" }}
          >
            Team Trackify
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            style={{ color: "#111827", fontWeight: 600, fontSize: "20px" }}
          >
            Welcome Back
          </motion.h2>
          <motion.p
            variants={itemVariants}
            style={{ color: "#6B7280", fontSize: "14px" }}
          >
            Please login to your account
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants}>
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
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              background: "#f9fafb",
            }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{ position: "relative", marginBottom: "25px" }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              paddingRight: "40px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              background: "#f9fafb",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash size={18} color="#6B7280" />
            ) : (
              <FaEye size={18} color="#6B7280" />
            )}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            disabled={loading}
          >
            {loading && (
              <div
                className="spinner-border spinner-border-sm text-light me-2"
                role="status"
                style={{ width: "1rem", height: "1rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            marginTop: "16px",
            fontSize: "14px",
            textAlign: "center",
            color: "#6B7280",
          }}
        >
          Forgot your password?{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/forgot-password")}
            style={{
              color: "#2563EB",
              fontWeight: 500,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Reset it
          </motion.a>
        </motion.p>
      </motion.form>
    </motion.div>
  );
};

export default Login;
