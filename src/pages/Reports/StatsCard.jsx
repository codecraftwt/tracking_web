import React from "react";
import { Card } from "react-bootstrap";

const StatsCard = ({ icon: Icon, value, label, iconBg, iconColor }) => {
  return (
    <Card className="border-0 shadow-sm" style={{ borderRadius: "8px" }}>
      <Card.Body className="p-4 d-flex align-items-center gap-3">
        {/* Icon section */}
        <div
          className="p-2 rounded-2 d-flex align-items-center justify-content-center"
          style={{
            background: iconBg,
            color: iconColor,
            width: "40px",
            height: "40px",
            minWidth: "40px",
          }}
        >
          <Icon size={20} />
        </div>

        {/* Text section */}
        <div>
          <h6
            className="fw-bold mb-1"
            style={{ color: "#1f2937", fontSize: "1.1rem" }}
          >
            {value}
          </h6>
          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
            {label}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatsCard;
