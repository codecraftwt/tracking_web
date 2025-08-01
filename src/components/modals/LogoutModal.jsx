import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const LogoutModal = ({ showModal, setShowModal, handleLogout }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      animation={true}
    >
      <Modal.Header
        closeButton
        style={{
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          borderBottom: "none",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
        className="text-white"
      >
        <Modal.Title className="fw-bold d-flex align-items-center gap-2 fs-5">
          <div
            className="p-1 px-2 rounded-3 me-2"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Slight shadow effect
            }}
          >
            <FaSignOutAlt size={20} />
          </div>
          Confirm Logout
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center p-4" style={{ background: "#f8fafc" }}>
        <motion.div
          className="mx-auto mb-4 p-3 rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
            border: "3px solid #FCA5A5",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSignOutAlt size={32} color="#DC2626" />
        </motion.div>

        <h4 className="fw-bold text-dark mb-3">Ready to Sign Out?</h4>
        <p className="text-secondary mb-0 fs-6" style={{ lineHeight: "1.6" }}>
          You will be logged out of your account and redirected to the login
          page.
        </p>
      </Modal.Body>

      <Modal.Footer
        className="d-flex justify-content-center gap-3 p-3 border-top"
        style={{ background: "#f8fafc" }}
      >
        <Button
          variant="outline-secondary"
          className="px-5 py-2 fw-semibold rounded-3 border-1"
          onClick={() => setShowModal(false)}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="px-4 py-2 fw-semibold rounded-3 border-0 d-flex justify-content-center align-items-center gap-2"
          onClick={handleLogout}
          style={{
            background: "linear-gradient(135deg, #DC2626, #B91C1C)",
            boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
            minWidth: "140px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
