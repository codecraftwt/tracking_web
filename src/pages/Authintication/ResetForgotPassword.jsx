import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import logo11 from "../../../src/assets/Images/logo11.png";
import { forgotPasswordReset } from "../../redux/slices/userSlice";

const ResetForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  // Access Redux state for loading, error, and success
  const { loading, forgotPasswordError, resetPasswordSuccess } = useSelector(
    (state) => state.UserData
  );

  useEffect(() => {
    // Extract the token from the URL
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("Invalid or expired token.");
      navigate("/login");
    }
  }, [location, navigate]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      toast.success("Password reset successful!");
      navigate("/login"); // Redirect to login after successful reset
    }
    if (forgotPasswordError) {
      toast.error(forgotPasswordError);
    }
  }, [resetPasswordSuccess, forgotPasswordError, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.error("Please enter a new password!");
      return;
    }

    // Dispatch the forgotPasswordReset action
    dispatch(forgotPasswordReset({ token, newPassword }));
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
        onSubmit={handleResetPassword}
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
            Reset Your Password
          </motion.h2>
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            disabled={loading}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaSpinner style={{ marginRight: "8px" }} />
              </motion.div>
            ) : null}
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetForgotPassword;
