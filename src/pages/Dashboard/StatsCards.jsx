import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StatsCards = ({ stats = [] }) => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      className="mb-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        {/* Left Side: Icon + Title */}
        <div className="d-flex align-items-center mb-2 mb-sm-0">
          <FaChartLine className="me-2" style={{ color: "#3B82F6" }} />
          <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
            Tracking Overview
          </h5>
        </div>
      </div>

      <Row className="g-4">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="border-0 shadow-sm h-100"
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  cursor:
                    stat.count > 0 && stat.onClick ? "pointer" : "default",
                }}
                onClick={() =>
                  stat.count > 0 && stat.onClick && stat.onClick(navigate)
                }
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Left Section */}
                    <div>
                      <p
                        className="text-muted small mb-1"
                        style={{ fontWeight: 500 }}
                      >
                        {stat.label}
                      </p>
                      <h3
                        className="fw-bold mb-0"
                        style={{ color: "#111827", fontSize: "1.75rem" }}
                      >
                        {stat.count}
                      </h3>
                    </div>

                    {/* Right Section: Icon */}
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        backgroundColor: stat.bgColor || "#F3F4F6",
                      }}
                    >
                      <span style={{ color: stat.iconColor || "#10B981" }}>
                        {stat.icon}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.section>
  );
};

export default StatsCards;
