import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useAuth } from "../context/AuthContext";
import { Modal, Button } from "react-bootstrap";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import LogoutModal from "./modals/LogoutModal";
import { useSelector } from "react-redux";

function Navbar({ username = "W", pageTitle = "", showBackButton = false }) {
  const [showLogout, setShowLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const userInitial = username.slice(0, 2).toUpperCase();
  const userData = useSelector((state) => state.UserData.userInfo);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logoutUser();
    logout();
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ backgroundColor: "#3479f3" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: isMobile ? "0" : "280px",
          right: 0,
          zIndex: 999,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "left 0.3s ease-in-out",
        }}
        className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm"
      >
        {/* Container for back button and title */}
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: isMobile ? "40px" : "0px" }}
        >
          {showBackButton && (
            <div
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "#212529",
                marginRight: "12px",
              }}
              onClick={handleBack}
            >
              <FaArrowLeft />
            </div>
          )}
          <h1
            style={{
              paddingTop: 8,
            }}
            className="fs-5 fw-bold"
          >
            {pageTitle}
          </h1>
        </div>

        {/* User avatar */}
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
              backgroundColor: "#e8f4ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onClick={() => setShowLogout(!showLogout)}
          >
            {userData?.avtar ? (
              <img
                src={userData.avtar}
                alt="User Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {userInitial}
              </span>
            )}
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
                onClick={() => setShowModal(true)}
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

      <LogoutModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleLogout={handleLogout}
      />

      <div style={{ paddingTop: "70px" }}></div>
    </div>
  );
}

export default Navbar;
