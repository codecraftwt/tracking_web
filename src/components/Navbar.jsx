import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useAuth } from "../context/AuthContext";
import { Modal, Button } from "react-bootstrap";

function Navbar({ username = "W", pageTitle = "" }) {
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
          style={{ backgroundColor: "#4A90E2" }}
          className="text-white"
        >
          <Modal.Title className="fw-bold"> Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-4">
          <p className="fs-5 text-dark">Are you sure you want to log out?</p>
          <p className="text-secondary">
            You will need to log in again to access your account.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="secondary"
            className="px-4 py-2 fw-bold"
            onClick={() => setShowModal(false)}
          >
            No, Stay Logged In
          </Button>
          <Button
            variant="danger"
            className="px-4 py-2 fw-bold"
            onClick={handleLogout}
          >
            Yes, Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navbar;
