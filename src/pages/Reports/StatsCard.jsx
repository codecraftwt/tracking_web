import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

const StatsCard = ({ icon: Icon, value, label, iconBg, iconColor }) => {
  return (
    <Card
      className="border-0 shadow-sm text-center"
      style={{ borderRadius: "8px" }}
    >
      <Card.Body className="p-2">
        <div className="mb-1">
          <div
            className="p-1 rounded-2 mx-auto"
            style={{
              width: "fit-content",
              background: iconBg,
              color: iconColor,
            }}
          >
            <Icon size={14} />
          </div>
        </div>
        <h6
          className="fw-bold mb-0"
          style={{ color: "#1f2937", fontSize: "1.1rem" }}
        >
          {value}
        </h6>
        <p className="text-muted mb-0" style={{ fontSize: "0.7rem" }}>
          {label}
        </p>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;
