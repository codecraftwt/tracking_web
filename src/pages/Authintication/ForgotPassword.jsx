import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import logo11 from "../../../src/assets/Images/logo11.png";
import { forgotPassword } from "../../redux/slices/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the loading state from Redux
  const { forgotPasswordLoading, forgotPasswordSuccess, forgotPasswordError } =
    useSelector((state) => state.UserData);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    try {
      const response = await dispatch(forgotPassword({ email }));

      if (response?.payload?.status === 1) {
        // toast.success("Password reset link sent to your email!");
        navigate("/login");
      } else {
        // toast.error(response?.payload?.message || "Error sending reset link!");
      }
    } catch (error) {
      // toast.error("Failed to send reset link. Please try again.");
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
        onSubmit={handleForgotPassword}
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
            style={{ color: "#111827", fontWeight: 600, fontSize: "1.8rem" }}
          >
            Team Trackify
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            style={{
              color: "#111827",
              fontWeight: 600,
              fontSize: "18px",
              marginTop: "15px",
            }}
          >
            Forgot Your Password?
          </motion.h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="email"
            placeholder="Enter your email"
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
              cursor: forgotPasswordLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            disabled={forgotPasswordLoading}
          >
            {forgotPasswordLoading && (
              <div
                className="spinner-border spinner-border-sm text-light me-2"
                role="status"
                style={{ width: "1rem", height: "1rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
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
          Remember your password?{" "}
          <motion.a
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/login")}
            style={{
              color: "#2563EB",
              fontWeight: 500,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Log in
          </motion.a>
        </motion.p>
      </motion.form>
    </motion.div>
  );
};

export default ForgotPassword;
