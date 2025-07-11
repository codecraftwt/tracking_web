import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaUserCircle,
  FaSignOutAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { Button, Card } from "react-bootstrap";
import LogoutModal from "../../components/modals/LogoutModal";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.UserData.userInfo);
  const [showModal, setShowModal] = useState(false);

  console.log("User Data:", userData);

  const handleEditClick = () => {
    navigate("/add-admin", { state: { user: userData, profileEditing: true } });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="profile-page"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(167, 191, 232, 0.1) 0%, rgba(211, 226, 243, 0.1) 90%)",
      }}
    >
      <Navbar pageTitle="My Profile" />

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Profile Header Card */}
            <Card className="profile-header-card shadow-sm mb-4 border-0">
              <Card.Body className="d-flex flex-column flex-md-row align-items-center p-4">
                <div className="avatar-container mb-3 mb-md-0 me-md-4">
                  {userData?.avtar ? (
                    <img
                      src={userData.avtar}
                      alt="Profile"
                      className="avatar-img"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      <FaUserCircle size={80} />
                    </div>
                  )}
                </div>
                <div className="profile-info text-center text-md-start">
                  <h2 className="profile-name mb-1 fs-3">{userData?.name}</h2>
                  <span className="badge bg-primary-light text-primary rounded-pill px-3 py-1">
                    {userData?.role_id === 1
                      ? "Admin"
                      : userData?.role_id === 2
                      ? "Super Admin"
                      : "User"}
                  </span>
                  <div className="mt-3">
                    <Button
                      variant="outline-primary"
                      className="edit-btn rounded-pill px-3"
                      onClick={handleEditClick}
                    >
                      <FaEdit className="me-1" /> Edit Profile
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Profile Details Card */}
            <Card className="profile-details-card shadow-sm border-0">
              <Card.Body className="p-4">
                <h5 className="card-title mb-4 text-uppercase fw-bold text-muted small">
                  Personal Information
                </h5>

                {/* Email */}
                <div className="detail-item d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="detail-icon bg-primary-light rounded-circle p-3 me-3">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="detail-label text-muted small">
                      Email Address
                    </div>
                    <div className="detail-value fw-medium">
                      {userData?.email || "Not provided"}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="detail-item d-flex align-items-center mb-4 pb-2 border-bottom">
                  <div className="detail-icon bg-primary-light rounded-circle p-3 me-3">
                    <FaPhone className="text-primary" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="detail-label text-muted small">
                      Phone Number
                    </div>
                    <div className="detail-value fw-medium">
                      {userData?.mobile_no || "Not provided"}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="detail-item d-flex align-items-center mb-4">
                  <div className="detail-icon bg-primary-light rounded-circle p-3 me-3">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="detail-label text-muted small">Address</div>
                    <div className="detail-value fw-medium">
                      {userData?.address || "Not provided"}
                    </div>
                  </div>
                </div>

                {/* Reset Password Button */}
                <div className="mt-4">
                  <Button
                    variant="outline-secondary"
                    className="w-100 py-3 rounded-pill fw-bold"
                    onClick={() => navigate("/reset-password")}
                  >
                    Reset Password
                  </Button>
                </div>

                {/* Logout Button */}
                <div className="pt-3">
                  <Button
                    variant="danger"
                    className="logout-btn w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center"
                    onClick={() => setShowModal(true)}
                  >
                    <FaSignOutAlt className="me-2" /> Sign Out
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      <LogoutModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleLogout={handleLogout}
      />

      {/* Custom CSS */}
      <style jsx>{`
        .profile-header-card {
          border-radius: 16px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        }

        .profile-details-card {
          border-radius: 16px;
          background: #ffffff;
        }

        .avatar-container {
          width: 120px;
          height: 120px;
        }

        .avatar-img {
          width: 80%;
          height: 80%;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9ecef;
          border-radius: 50%;
          color: #adb5bd;
          border: 4px solid white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .profile-name {
          font-weight: 700;
          color: #2c3e50;
        }

        .detail-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .detail-label {
          font-size: 0.8rem;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 1.05rem;
          color: #495057;
        }

        .edit-btn {
          border-width: 2px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .logout-btn {
          background: linear-gradient(135deg, #ff6b6b, #f06595);
          border: none;
          box-shadow: 0 4px 15px rgba(240, 101, 149, 0.3);
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(240, 101, 149, 0.4);
        }

        .bg-primary-light {
          background-color: rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Profile;
