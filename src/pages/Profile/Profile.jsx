import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.UserData.userInfo);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Log user data changes if necessary
  }, [userData]);

  const handleEditClick = () => {
    navigate("/add-admin", { state: { user: userData, profileEditing: true } });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #A7BFE8 0%, #D3E2F3 100%)", // Lighter gradient
      }}
    >
      <Navbar pageTitle="Profile" />
      <main
        className="container py-5 d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="rounded-5 p-5 w-100"
          style={{
            maxWidth: "600px",
            background: "white",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            zIndex: 10,
            position: "relative",
          }}
        >
          {/* Profile Info Section */}
          <div className="text-center mb-4">
            {/* Avatar */}
            <div className="mb-4">
              {userData?.avtar ? (
                <img
                  src={userData.avtar}
                  alt="Profile Avatar"
                  className="rounded-circle border border-4 border-primary shadow-lg"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    background: "#f3f4f6",
                  }}
                />
              ) : (
                <FaUserCircle
                  size={120}
                  className="text-primary bg-light rounded-circle shadow-lg"
                />
              )}
            </div>
            <h3 className="text-dark fw-bold">{userData?.name}</h3>
            <p className="text-muted mb-3">{userData?.role || "User"}</p>
          </div>

          {/* User Details Section */}
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-3">
              <label className="fw-semibold text-secondary small">Email</label>
              <span className="text-dark fw-medium">{userData?.email}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <label className="fw-semibold text-secondary small">Mobile</label>
              <span className="text-dark fw-medium">{userData?.mobile_no}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <label className="fw-semibold text-secondary small">
                Address
              </label>
              <span className="text-dark fw-medium">{userData?.address}</span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            variant="outline-primary"
            className="w-100 mb-4 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2"
            onClick={handleEditClick}
            style={{
              borderColor: "#3B82F6",
              background: "#ffffff",
              color: "#3B82F6",
              fontWeight: "500",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.1)",
              textTransform: "uppercase",
            }}
          >
            <FaEdit size={18} color="#3B82F6" /> Edit Profile
          </Button>

          {/* Logout Button */}
          <Button
            variant="danger"
            className="w-100 py-2 fw-semibold rounded-3 mt-2 d-flex align-items-center justify-content-center gap-2"
            onClick={() => setShowModal(true)}
            style={{
              fontSize: "1.1rem",
              letterSpacing: 0.5,
              boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
              background: "linear-gradient(135deg, #DC2626, #B91C1C)",
            }}
          >
            <FaSignOutAlt className="me-2" /> Log Out
          </Button>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            borderBottom: "none",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
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
            <FaSignOutAlt size={16} /> Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
