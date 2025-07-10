import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCreditCard } from "react-icons/fa";
import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

const CurrentPlan = ({ currentPlan }) => {
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    if (currentPlan) {
      setPlanDetails(currentPlan);
    }
  }, [currentPlan]);

  const getExpiryStatus = (expiresAt) => {
    const daysLeft = planExpiresIn(expiresAt);
    if (daysLeft <= 0) {
      return { status: "Expired", badgeColor: "danger" }; // Red badge for expired
    }
    return { status: `${daysLeft} days left`, badgeColor: "success" }; // Green badge if still active
  };

  const { status, badgeColor } = getExpiryStatus(planDetails?.expiresAt || "");

  return (
    <motion.section
      className="mb-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        {/* Icon + Title */}
        <div className="d-flex align-items-center mb-2 mb-sm-0">
          <FaCreditCard className="me-2" style={{ color: "#3B82F6" }} />
          <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
            Current Plan
          </h5>
        </div>
      </div>

      {planDetails ? (
        <Card
          className="border-0 shadow-sm"
          style={{ borderRadius: "16px", backgroundColor: "#fff" }}
        >
          <Card.Body className="p-4">
            <h5 className="fw-semibold mb-3 text-primary">
              {planDetails.description}
            </h5>

            <Row className="mb-2">
              <Col md={6}>
                <p className="text-muted mb-1">
                  <strong>Duration:</strong> {planDetails.duration}
                </p>
              </Col>
              <Col md={6}>
                <p className="text-muted mb-1">
                  <strong>Amount:</strong> ₹{planDetails.amount}
                </p>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <p className="text-muted mb-1">
                  <strong>Currency:</strong> {planDetails.currency}
                </p>
              </Col>
              <Col md={6}>
                <p className="text-muted mb-1">
                  <strong>Status:</strong>{" "}
                  {planDetails.isActive ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="secondary">Inactive</Badge>
                  )}
                </p>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <p className="text-muted mb-1">
                  <strong>Created At:</strong>{" "}
                  {formatDateDDMMYYYY(planDetails.createdAt)}
                </p>
              </Col>
              <Col md={6}>
                <p className="text-muted mb-1">
                  <strong>Expires At:</strong>{" "}
                  {formatDateDDMMYYYY(planDetails.expiresAt)}{" "}
                  <Badge bg={badgeColor}>{status}</Badge>
                </p>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <p className="text-muted mb-0">
                  <strong>Min Users:</strong> {planDetails.minUser}
                </p>
              </Col>
              <Col md={6}>
                <p className="text-muted mb-0">
                  <strong>Max Users:</strong> {planDetails.maxUser}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading plan details...</p>
      )}
    </motion.section>
  );
};

export default CurrentPlan;
