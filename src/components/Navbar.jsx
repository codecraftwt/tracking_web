import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useAuth } from "../context/AuthContext";
import { Modal, Button } from "react-bootstrap";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa"; // Importing a back arrow icon from react-icons
import LogoutModal from "./modals/LogoutModal";
import { useSelector } from "react-redux";

function Navbar({ username = "W", pageTitle = "", showBackButton = false }) {
  const [showLogout, setShowLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userInitial = username.slice(0, 2).toUpperCase();
  const userData = useSelector((state) => state.UserData.userInfo);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logoutUser();
    logout();
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1); // This navigates to the previous page in history
  };

  return (
    <div style={{ backgroundColor: "#3479f3" }}>
      <header
        style={{
          borderTopLeftRadius: "35px",
          position: "fixed",
          top: 0,
          width: "82%",
          zIndex: 999,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm"
      >
        {/* Container for back button and title */}
        <div className="d-flex align-items-center">
          {/* Conditionally render the back button */}
          {showBackButton && (
            <div
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "#212529",
                marginRight: "12px", // Space between back icon and title
              }}
              onClick={handleBack}
            >
              <FaArrowLeft />
            </div>
          )}
          {/* Page title */}
          <h1 style={{ paddingTop: 8 }} className="fs-5 fw-bold">
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

      {/* Logout Confirmation Modal */}
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
