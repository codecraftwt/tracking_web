import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";
import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";
import { useNavigate } from "react-router-dom";

const CurrentPlan = ({ currentPlan }) => {
  const [planDetails, setPlanDetails] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    if (currentPlan) {
      setPlanDetails(currentPlan);
    }
  }, [currentPlan]);

  const getExpiryStatus = (expiresAt) => {
    const daysLeft = planExpiresIn(expiresAt);
    if (daysLeft <= 0) {
      return { status: "Expired", badgeColor: "danger" };
    } else if (daysLeft <= 7) {
      return { status: `${daysLeft} days left`, badgeColor: "warning" };
    }
    return { status: `${daysLeft} days left`, badgeColor: "success" };
  };

  const { status, badgeColor } = getExpiryStatus(planDetails?.expiresAt || "");

  const handleGoToSubscription = () => {
    navigation("/payment-plans");
  };

  const isPlanDetailsValid = planDetails && Object.keys(planDetails).length > 0;

  return (
    <motion.section
      className="mb-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center mb-2 mb-sm-0">
          <FaCreditCard className="me-2" style={{ color: "#3B82F6" }} />
          <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
            Current Plan
          </h5>
        </div>
      </div>

      {isPlanDetailsValid ? (
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
        <Card
          className="border-0 shadow-sm text-center"
          style={{
            borderRadius: "16px",
            backgroundColor: "#fff",
            borderLeft: "4px solid #ffc107",
          }}
        >
          <Card.Body className="p-4">
            <div className="mb-3">
              <FaExclamationTriangle
                size={48}
                className="text-warning mb-2"
                style={{ opacity: 0.8 }}
              />
              <h5 className="fw-semibold">No Active Subscription</h5>
            </div>

            <p className="text-muted mb-4">
              You don't have any active subscription plans. Subscribe now to
              unlock all features.
            </p>

            <Button
              variant="warning"
              className="fw-bold text-white"
              onClick={handleGoToSubscription}
              style={{
                padding: "10px 24px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(251, 191, 36, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 12px rgba(251, 191, 36, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(251, 191, 36, 0.3)";
              }}
            >
              Browse Plans <FaArrowRight className="ms-2" />
            </Button>
          </Card.Body>
        </Card>
      )}
    </motion.section>
  );
};

export default CurrentPlan;
