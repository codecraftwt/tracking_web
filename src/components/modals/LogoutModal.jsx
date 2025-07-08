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
      animation={false}
    >
      <Modal.Header
        closeButton
        style={{
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          borderBottom: "none",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
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

      <Modal.Body className="text-center p-5" style={{ background: "#f8fafc" }}>
        <motion.div
          className="mx-auto mb-4 p-3 rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
            border: "3px solid #FCA5A5",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
          <FaSignOutAlt size={16} />
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
