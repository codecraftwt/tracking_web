import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaRoute,
  FaMapMarkedAlt,
  FaCamera,
  FaApple,
  FaGooglePlay,
  FaHeart,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import mobilenew from "../../../src/assets/Images/landing_new.png";
import mobilenew2 from "../../../src/assets/Images/mobile.png";
import Footer from "./Footer";
import Header from "./Header";

const Landing = () => {
  const navigate = useNavigate();
  const appDownloadRef = useRef(null);
  const handleAppStoreClick = () => {
    window.open(
      "https://apps.apple.com/in/app/team-trackify/id6744400871",
      "_blank"
    );
  };

  const handlePlayStoreClick = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.whc_tracking&pcampaignid=web_share",
      "_blank"
    );
  };

  const handleGetStartedClick = () => {
    appDownloadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Modern Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="py-5 py-lg-7" style={{ backgroundColor: "#f8fafc" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-lg-1 order-2 mt-5 mt-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1
                  className="display-4 fw-bold mb-4"
                  style={{ color: "#1e293b" }}
                >
                  Real-Time{" "}
                  <span style={{ color: "#2563EB" }}>Location Tracking</span>{" "}
                  Made Simple
                </h1>
                <p className="lead text-muted mb-4">
                  Track users, monitor routes, and capture location-tagged
                  images with our powerful yet simple platform.
                </p>
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <Button
                    size="lg"
                    onClick={handleGetStartedClick}
                    className="px-4 py-3 rounded-pill d-flex align-items-center"
                    style={{
                      background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                      border: "none",
                    }}
                  >
                    Get Started <FiArrowRight className="ms-2" />
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="px-4 py-3 rounded-pill"
                    onClick={() => navigate("/contact")}
                  >
                    Live Demo
                  </Button>
                </div>
              </motion.div>
            </Col>
            <Col
              lg={6}
              className="order-lg-2 order-1 d-flex justify-content-center align-items-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="position-relative"
              >
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(30, 64, 175, 0.1))",
                    transform: "rotate(5deg)",
                    zIndex: -1,
                  }}
                ></div>
                <img
                  src={mobilenew}
                  alt="App Screenshot"
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "550px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 py-lg-7">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill">
                  Powerful Features
                </span>
                <h2 className="fw-bold mb-3">
                  Everything You Need for Location Tracking
                </h2>
                <p className="text-muted">
                  Our platform provides all the tools you need to monitor and
                  manage location data effectively.
                </p>
              </motion.div>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <motion.div
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FeatureCard
                  icon={<FaMapMarkedAlt size={32} className="text-primary" />}
                  title="Live Tracking"
                  description="Monitor user locations in real-time with our interactive map interface."
                  gradient="linear-gradient(135deg, #EFF6FF, #DBEAFE)"
                />
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FeatureCard
                  icon={<FaRoute size={32} className="text-primary" />}
                  title="Route History"
                  description="View and analyze past routes with detailed timeline playback."
                  gradient="linear-gradient(135deg, #F5F3FF, #DDD6FE)"
                />
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FeatureCard
                  icon={<FaCamera size={32} className="text-primary" />}
                  title="Photo Capture"
                  description="Geotagged photo capture with automatic location metadata."
                  gradient="linear-gradient(135deg, #ECFDF5, #D1FAE5)"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* App Showcase Section */}
      <section className="py-5 py-lg-7 bg-light" ref={appDownloadRef}>
        <Container>
          <Row className="align-items-center">
            <Col
              lg={6}
              className="mb-5 mb-lg-0 d-flex justify-content-center align-items-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="position-relative">
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(30, 64, 175, 0.05))",
                      transform: "rotate(3deg)",
                      zIndex: -1,
                    }}
                  ></div>
                  <img
                    src={mobilenew2}
                    alt="App Screenshot"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "550px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill">
                  Available Now
                </span>
                <h2 className="fw-bold mb-4">Download Our Mobile App</h2>
                <p className="text-muted mb-4">
                  Get the full Trackify experience on your mobile device with
                  our dedicated iOS and Android apps.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={handleAppStoreClick}
                      className="btn btn-dark rounded-pill px-5 py-3 d-flex align-items-center"
                    >
                      <FaApple size={24} className="me-3" />
                      <div className="text-start">
                        <small
                          className="d-block"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Download on the
                        </small>
                        <span style={{ fontSize: "1.1rem" }}>App Store</span>
                      </div>
                    </button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={handlePlayStoreClick}
                      className="btn btn-dark rounded-pill px-5 py-3 d-flex align-items-center"
                    >
                      <FaGooglePlay size={24} className="me-3" />
                      <div className="text-start">
                        <small
                          className="d-block"
                          style={{ fontSize: "0.7rem" }}
                        >
                          Get it on
                        </small>
                        <span style={{ fontSize: "1.1rem" }}>Google Play</span>
                      </div>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 py-lg-7"
        style={{ background: "linear-gradient(135deg, #2563EB, #1E40AF)" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="fw-bold mb-4">
                  Ready to Transform Your Location Tracking?
                </h2>
                <p className="mb-5 opacity-75">
                  Join the growing number of businesses choosing Trackify to
                  streamline operations and boost efficiency
                </p>
                <Button
                  size="lg"
                  className="px-5 py-3 rounded-pill fw-bold d-inline-flex align-items-center"
                  style={{ backgroundColor: "#ffffff", color: "#2563EB" }}
                  onClick={() => navigate("/contact")}
                >
                  Contact Us <FiArrowRight className="ms-2" />
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div
    className="h-100 p-4 rounded-4 shadow-sm"
    style={{
      background: gradient || "#f8fafc",
      border: "1px solid rgba(0,0,0,0.05)",
    }}
  >
    <div
      className="mb-4 p-3 bg-white rounded-3 d-inline-flex"
      style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
    >
      {icon}
    </div>
    <h5 className="fw-bold mb-3">{title}</h5>
    <p className="text-muted mb-0">{description}</p>
  </div>
);

export default Landing;
