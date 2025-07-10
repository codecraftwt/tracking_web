import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const PlanModal = ({
  show,
  handleClose,
  handleSubmit,
  planData,
  handleChange,
  planOptions = [],
  durationOptions = [],
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      style={{ zIndex: 1050 }}
    >
      <Modal.Header
        closeButton
        style={{
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          borderBottom: "none",
        }}
        className="text-white"
      >
        <Modal.Title className="fw-bold d-flex align-items-center gap-2">
          <FaPlus />
          {planData._id ? "Edit Plan" : "Add New Plan"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-5">
        <Form>
          {/* Plan Type */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Plan Type
            </Form.Label>
            <Form.Select
              name="name"
              value={planData.name}
              onChange={handleChange}
              className="form-control-lg border-0"
              style={formControlStyle}
            >
              <option value="">Select Plan Type</option>
              {planOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Duration */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Duration
            </Form.Label>
            <Form.Select
              name="duration"
              value={planData.duration}
              onChange={handleChange}
              className="form-control-lg border-0"
              style={formControlStyle}
            >
              <option value="">Select Duration</option>
              {durationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Description
            </Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={planData.description}
              onChange={handleChange}
              placeholder="Enter plan description"
              className="form-control-lg border-0"
              style={formControlStyle}
            />
          </Form.Group>

          {/* Min Users */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Minimum Users
            </Form.Label>
            <Form.Control
              type="number"
              name="minUsers"
              value={planData.minUsers}
              onChange={handleChange}
              placeholder="Enter minimum number of users"
              className="form-control-lg border-0"
              style={formControlStyle}
            />
          </Form.Group>

          {/* Max Users */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Maximum Users
            </Form.Label>
            <Form.Control
              type="number"
              name="maxUsers"
              value={planData.maxUsers}
              onChange={handleChange}
              placeholder="Enter maximum number of users"
              className="form-control-lg border-0"
              style={formControlStyle}
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Price (₹)
            </Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={planData.price}
              onChange={handleChange}
              placeholder="Enter plan price"
              className="form-control-lg border-0"
              style={formControlStyle}
            />
          </Form.Group>

          {/* Status (only when editing) */}
          {planData._id && (
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark mb-2">
                Status
              </Form.Label>
              <Form.Select
                name="status"
                value={planData.status || "active"}
                onChange={handleChange}
                className="form-control-lg border-0"
                style={formControlStyle}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center gap-3 p-4 border-top">
        <Button
          variant="outline-secondary"
          className="px-4 py-3 fw-semibold"
          onClick={handleClose}
          style={buttonStyle}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="px-4 py-3 fw-semibold"
          onClick={handleSubmit}
          style={submitButtonStyle}
        >
          <FaPlus className="me-2" />
          {planData._id ? "Update Plan" : "Create Plan"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// 🔹 Common styles
const formControlStyle = {
  background: "#f8f9fa",
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
  fontSize: "16px",
};

const buttonStyle = {
  borderRadius: "10px",
  fontSize: "16px",
  minWidth: "120px",
};

const submitButtonStyle = {
  ...buttonStyle,
  background: "linear-gradient(135deg, #3B82F6, #2563EB)",
  border: "none",
};

export default PlanModal;
