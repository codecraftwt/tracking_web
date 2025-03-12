import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";

const Profile = () => {
  const userData = useSelector((state) => state.UserData.userInfo);

  useEffect(() => {
    console.log("User Data fetched:", userData);
  }, []);

  useEffect(() => {
    console.log("User Data Updated:", userData);
  }, [userData]);

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate("/add-admin", { state: { admin: userData } });
  };

  return (
    <div>
      <Navbar pageTitle="Profile" />
      <main className="container my-5">
        <section
          className="mb-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "30px",
              borderRadius: "15px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              position: "relative", // Added for positioning the edit icon
            }}
          >
            {userData?.avtar && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={userData.avtar}
                  alt="Profile Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ddd",
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

            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              {userData?.name}
            </h2>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ fontWeight: "500", color: "#555", fontSize: "14px" }}
              >
                Email
              </label>
              <p style={{ margin: "5px 0 0", fontSize: "16px", color: "#333" }}>
                {" "}
                {userData?.email}
              </p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ fontWeight: "500", color: "#555", fontSize: "14px" }}
              >
                Mobile
              </label>
              <p style={{ margin: "5px 0 0", fontSize: "16px", color: "#333" }}>
                {userData?.mobile_no}
              </p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{ fontWeight: "500", color: "#555", fontSize: "14px" }}
              >
                Address
              </label>
              <p style={{ margin: "5px 0 0", fontSize: "16px", color: "#333" }}>
                {userData?.address}
              </p>
            </div>
            <button
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                marginTop: "20px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#ff7875")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4f")}
            >
              Log Out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
