import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const DeleteConfirmModal = ({
  show,
  onHide,
  onConfirm,
  title = "Delete",
  message,
  subMessage,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="md"
      aria-labelledby="delete-confirmation-modal"
    >
      <Modal.Header
        closeButton
        style={{
          background: "linear-gradient(135deg, #DC2626, #B91C1C)",
          borderBottom: "none",
        }}
        className="text-white rounded-top"
      >
        <Modal.Title
          id="delete-confirmation-modal"
          className="fw-bold d-flex align-items-center gap-2 fs-5"
        >
          <FaTrash />
          Confirm {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center p-4">
        <div className="mb-3">
          <div
            className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center mx-auto"
            style={{ width: "60px", height: "60px" }}
          >
            <FaTrash size={24} />
          </div>
        </div>
        <h5 className="fw-bold mb-3" style={{ color: "#1f2937" }}>
          {message ||
            `Are you sure you want to ${title.toLowerCase()} this item?`}
        </h5>
        {subMessage && <p className="text-muted mb-0 ">{subMessage}</p>}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center gap-2 p-4 border-top">
        <Button
          variant="outline-secondary"
          className="px-5 py-2 fw-semibold rounded-3"
          onClick={onHide}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          className="px-5 py-2 fw-semibold rounded-3"
          onClick={onConfirm}
          style={{
            background: "linear-gradient(135deg, #DC2626, #B91C1C)",
          }}
        >
          {/* <FaTrash className="me-2" /> */}
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
