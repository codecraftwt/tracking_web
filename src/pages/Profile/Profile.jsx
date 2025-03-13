import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.UserData.userInfo);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("User Data fetched:", userData);
  }, []);

  useEffect(() => {
    console.log("User Data Updated:", userData);
  }, [userData]);

  const handleEditClick = () => {
    navigate("/add-admin", { state: { user: userData, profileEditing: true } });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Navbar pageTitle="Profile" />
      <main className="container my-5">
        <section className="d-flex flex-column align-items-center">
          <div
            className="bg-white p-4 rounded shadow border"
            style={{ maxWidth: "500px", width: "100%", position: "relative" }}
          >
            {userData?.avtar && (
              <div className="d-flex justify-content-center mb-3">
                <img
                  src={userData.avtar}
                  alt="Profile Avatar"
                  className="rounded-circle border"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* Edit Icon */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            >
              <FaEdit size={24} color="#555" />
            </div>

            <h2 className="text-center mb-4 fw-semibold text-dark">
              {userData?.name}
            </h2>

            <div className="mb-3">
              <label className="fw-bold text-secondary">Email</label>
              <p className="m-0 text-dark">{userData?.email}</p>
            </div>

            <div className="mb-3">
              <label className="fw-bold text-secondary">Mobile</label>
              <p className="m-0 text-dark">{userData?.mobile_no}</p>
            </div>

            <div className="mb-3">
              <label className="fw-bold text-secondary">Address</label>
              <p className="m-0 text-dark">{userData?.address}</p>
            </div>

            <button
              className="btn btn-danger w-100 mt-3"
              onClick={() => setShowModal(true)}
            >
              Log Out
            </button>
          </div>
        </section>
      </main>

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
};

export default Profile;
