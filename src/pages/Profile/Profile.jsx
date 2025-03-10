import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";

const Profile = () => {
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
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "25px", fontWeight: "600", color: "#333" }}>
              SuperAdmin
            </h2>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "500", color: "#555", fontSize: "14px" }}>Email</label>
              <p style={{ margin: "5px 0 0", fontSize: "16px", color: "#333" }}>superadmin@tracking.com</p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "500", color: "#555", fontSize: "14px" }}>Mobile</label>
              <p style={{ margin: "5px 0 0", fontSize: "16px", color: "#333" }}>7058730875</p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "500", color: "#555", fontSize: "14px" }}>Address</label>
              <p style={{ margin: "5px 0 0", fontSize: "16px", color: "#333" }}>Kolhapur</p>
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