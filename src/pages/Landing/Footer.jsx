import React from "react";
import { Container } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import logo from "../../../src/assets/Images/logo333.png";

const Footer = () => {
  return (
    <footer className="py-4 text-white" style={{ background: "#001F3F" }}>
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Trackify Logo and Text */}
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <img
            src={logo}
            alt="mainlogo"
            style={{ height: "45px", marginRight: "10px" }}
          />
          <span className="fw-bold fs-5">Team Trackify</span>
        </div>

        {/* Footer Text (Copyright + Privacy Policy) */}
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <small>
            © {new Date().getFullYear()} Team Trackify. All rights reserved.{" "}
            <a
              href="/privacy-policy"
              style={{ color: "lightblue", textDecoration: "underline" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </small>
        </div>

        {/* Footer Message */}
        <div className="d-flex justify-content-center justify-content-md-end">
          <small className="mt-2 mt-md-0">
            Made with <FaHeart className="text-danger" /> for location tracking
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
