import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaRoute, FaMapMarkedAlt, FaCamera } from "react-icons/fa";
import logo333 from "../../../src/assets/Images/logo333.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Navbar
        expand="lg"
        className="shadow-sm"
        style={{
          background: "linear-gradient(135deg, #4A90E2, #2563EB, #1E3A8A)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
        }}
      >
        <Container>
          <img
            src={logo333}
            alt="mainlogo"
            style={{
              height: "60px",
              marginBottom: "5px",
              paddingRight: "10px",
            }}
          />
          <Navbar.Brand style={{ color: "#fff", fontWeight: "bold" }}>
            Team Trackify
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-white"
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="d-flex gap-3">
              <button
                className="btn btn-outline-light rounded-lg px-4"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-light rounded-lg px-4"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="flex-grow-1 d-flex align-items-center">
        <Row className="w-100 align-items-center">
          <Col md={6} className="text-center text-md-start">
            <motion.h1
              className="display-4 mb-3 fw-bold"
              style={{ color: "#2563EB" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Real-Time Location Tracking
            </motion.h1>
            <motion.p
              className="lead mb-4"
              style={{ color: "#1D4ED8" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Track users, monitor routes, and capture location-tagged images
              with precision.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="me-3 px-4"
                style={{
                  backgroundColor: "#2563EB",
                  border: "none",
                  color: "#fff",
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => navigate("/contact")}
                className="px-4"
              >
                Contact Us
              </Button>
            </motion.div>
          </Col>

          <Col md={6} className="mt-5 mt-md-0">
            <motion.div
              className="d-flex justify-content-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <FeatureCard
                icon={<FaMapMarkedAlt size={36} className="text-primary" />}
                title="Live Tracking"
                description="Monitor user locations in real-time with map integration."
              />
              <FeatureCard
                icon={<FaRoute size={36} className="text-primary" />}
                title="Route History"
                description="View past routes and travel paths anytime."
              />
              <FeatureCard
                icon={<FaCamera size={36} className="text-primary" />}
                title="Photo Capture"
                description="Capture and store images with location tags."
              />
            </motion.div>
          </Col>
        </Row>
      </Container>

      <footer
        className="text-center py-3 mt-auto"
        style={{
          backgroundColor: "#f9fafb",
          color: "#2563EB",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div className="d-flex justify-content-center align-items-center gap-3">
          <small>
            © {new Date().getFullYear()} Team Trackify. All rights reserved.
          </small>
          <span>|</span>
          <a
            href="/privacy-policy"
            className="text-decoration-none"
            style={{ color: "#2563EB" }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/privacy-policy");
            }}
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="rounded-4 p-4 text-center"
    style={{
      width: 180,
      backgroundColor: "#EFF6FF", // light blue bg
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      color: "#1D4ED8", // blue text
      border: "1px solid #DBEAFE",
    }}
  >
    <div className="mb-3">{icon}</div>
    <h5 className="fw-semibold mb-2">{title}</h5>
    <p className="small" style={{ color: "#3B82F6" }}>
      {description}
    </p>
  </motion.div>
);

export default Landing;
