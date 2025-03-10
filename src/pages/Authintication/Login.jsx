import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    setTimeout(() => {
      navigate("/dashboard", { state: { loginSuccess: true } });
    }, 500);
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
          src="src/assets/Images/mainlogo.png"
          alt="Netubia"
          // className="rounded-circle"
          style={{
            objectFit: "contain",
            height: "110px",
            marginBottom: "20px",
            maxWidth: "100%",
          }}
        />
        {/* <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "700" }}>
          Netubia
        </h1> */}
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
          transition: "all 0.3s ease-in-out",
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
            outline: "none",
            transition: "all 0.3s ease",
            fontFamily: "'Roboto', sans-serif",
          }}
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 8px rgba(90, 103, 216, 0.6)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />

        <input
          type="password"
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
            outline: "none",
            transition: "all 0.3s ease",
            fontFamily: "'Roboto', sans-serif",
          }}
          onFocus={(e) =>
            (e.target.style.boxShadow = "0 0 8px rgba(90, 103, 216, 0.6)")
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#4C51BF";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#000";
            e.target.style.transform = "scale(1)";
          }}
        >
          Log in
        </button>

        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            color: "#777",
            fontWeight: "300",
          }}
        >
          Forgot your password?{" "}
          <a
            href="/reset-password"
            style={{ color: "#5A67D8", fontWeight: "500" }}
          >
            Reset it here
          </a>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
