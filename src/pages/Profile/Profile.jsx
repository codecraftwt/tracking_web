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
    // console.log("User Data fetched:", userData);
  }, []);

  useEffect(() => {
    // console.log("User Data Updated:", userData);
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
        background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
      }}
    >
      <Navbar pageTitle="Profile" />
      <main className="container py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div
          className="shadow-lg rounded-4 p-4 position-relative"
          style={{
            maxWidth: 420,
            width: "100%",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(59,130,246,0.08)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
          }}
        >
          {/* Edit Icon */}
          <Button
            variant="light"
            className="position-absolute top-0 end-0 m-3 p-2 border-0 shadow-sm"
            style={{ borderRadius: "50%", zIndex: 2 }}
            onClick={handleEditClick}
          >
            <FaEdit size={18} color="#3B82F6" />
          </Button>

          {/* Avatar */}
          <div className="d-flex justify-content-center mb-3">
            {userData?.avtar ? (
              <img
                src={userData.avtar}
                alt="Profile Avatar"
                className="rounded-circle border border-3 border-primary shadow"
                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "cover",
                  background: "#f3f4f6",
                }}
              />
            ) : (
              <FaUserCircle size={110} className="text-primary bg-light rounded-circle shadow" />
            )}
          </div>

          <h3 className="text-center mb-2 fw-bold text-dark" style={{ letterSpacing: 0.5 }}>
            {userData?.name}
          </h3>
          <p className="text-center text-muted mb-4" style={{ fontSize: "1rem" }}>
            {userData?.role ? userData.role : "User"}
          </p>

          <div className="mb-3 px-2">
            <label className="fw-semibold text-secondary small">Email</label>
            <div className="d-flex align-items-center gap-2">
              <span className="text-dark fw-medium">{userData?.email}</span>
            </div>
          </div>

          <div className="mb-3 px-2">
            <label className="fw-semibold text-secondary small">Mobile</label>
            <div className="d-flex align-items-center gap-2">
              <span className="text-dark fw-medium">{userData?.mobile_no}</span>
            </div>
          </div>

          <div className="mb-3 px-2">
            <label className="fw-semibold text-secondary small">Address</label>
            <div className="d-flex align-items-center gap-2">
              <span className="text-dark fw-medium">{userData?.address}</span>
            </div>
          </div>

          <Button
            variant="danger"
            className="w-100 py-2 fw-semibold rounded-3 mt-3 d-flex align-items-center justify-content-center gap-2"
            style={{ fontSize: "1.1rem", letterSpacing: 0.5 }}
            onClick={() => setShowModal(true)}
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
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px"
          }}
          className="text-white"
        >
          <Modal.Title className="fw-bold d-flex align-items-center gap-2">
            <div 
              className="p-2 rounded-3"
              style={{ 
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)"
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
              border: "3px solid #FCA5A5"
            }}
          >
            <FaSignOutAlt size={32} color="#DC2626" />
          </div>
          
          <h4 className="fw-bold text-dark mb-3">Ready to Sign Out?</h4>
          <p className="text-secondary mb-0 fs-6" style={{ lineHeight: "1.6" }}>
            You will be logged out of your account and redirected to the login page.
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
              minWidth: "140px"
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
              minWidth: "140px"
            }}
          >
            <FaSignOutAlt size={16} /> 
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
