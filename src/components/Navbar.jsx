import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";

function Navbar({ username = "SA", pageTitle = "" }) {
  const [showLogout, setShowLogout] = useState(false);
  const userInitial = username.slice(0, 2).toUpperCase();
  const navigate = useNavigate();

  const usernameStyle = {
    color: "#000",
    fontSize: "16px",
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div style={{ backgroundColor: "#4A90E2" }}>
      <header
        style={{ borderTopLeftRadius: "35px" }}
        className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm"
      >
        <h1 style={{ paddingTop: 8 }} className="fs-4 fw-bold">
          {pageTitle}
        </h1>
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setShowLogout(!showLogout)}
          >
            {userInitial}
          </div>

          {showLogout && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                right: "0",
                top: "75px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "8px 16px",
                minWidth: "120px",
                transition: "opacity 0.3s ease-in-out",
                opacity: 1,
              }}
            >
              <button
                className="dropdown-item"
                onClick={handleLogout}
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "none",
                  color: "#333",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#007bff";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                  e.target.style.color = "#333";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
