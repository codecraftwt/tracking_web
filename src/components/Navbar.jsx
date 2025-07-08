import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useAuth } from "../context/AuthContext";
import { Modal, Button } from "react-bootstrap";
import { FaArrowLeft, FaSignOutAlt } from "react-icons/fa"; // Importing a back arrow icon from react-icons

function Navbar({ username = "W", pageTitle = "", showBackButton = false }) {
  const [showLogout, setShowLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userInitial = username.slice(0, 2).toUpperCase();
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
        style={{ borderTopLeftRadius: "35px" }}
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            borderBottom: "none",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
          className="text-white"
        >
          <Modal.Title className="fw-bold d-flex align-items-center gap-2">
            <div
              className="p-2 rounded-3"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <FaSignOutAlt size={18} />
            </div>
            Confirm Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center p-5"
          style={{ background: "#f8fafc" }}
        >
          <div
            className="mx-auto mb-4 p-3 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
              border: "3px solid #FCA5A5",
            }}
          >
            <FaSignOutAlt size={32} color="#DC2626" />
          </div>

          <h4 className="fw-bold text-dark mb-3">Ready to Sign Out?</h4>
          <p className="text-secondary mb-0 fs-6" style={{ lineHeight: "1.6" }}>
            You will be logged out of your account and redirected to the login
            page.
          </p>
        </Modal.Body>
        <Modal.Footer
          className="d-flex justify-content-center gap-3 p-4 border-top"
          style={{ background: "#f8fafc" }}
        >
          <Button
            variant="light"
            className="px-4 py-2 fw-semibold rounded-3 border-0"
            style={{
              background: "#ffffff",
              color: "#6B7280",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              minWidth: "140px",
            }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="px-4 py-2 fw-semibold rounded-3 border-0 d-flex align-items-center gap-2"
            onClick={handleLogout}
            style={{
              background: "linear-gradient(135deg, #DC2626, #B91C1C)",
              boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
              minWidth: "140px",
            }}
          >
            <FaSignOutAlt size={16} />
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navbar;
