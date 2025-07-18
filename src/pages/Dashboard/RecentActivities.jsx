import React from "react";
import { Card, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBell, FaCircle, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";

const RecentActivities = ({ users = [] }) => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="mb-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <FaBell className="me-2" style={{ color: "#3B82F6" }} />
          <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
            Recent Activities
          </h5>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline-primary btn-sm rounded-pill"
          onClick={() => navigate("/user")}
        >
          View All
          <FaArrowRight className="ms-2" size={12} />
        </motion.button>
      </div>

      <motion.div>
        <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
          <Card.Body className="p-0">
            {users.length > 0 ? (
              <div>
                {users.map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`d-flex justify-content-between align-items-center p-4 ${
                      index !== users.length - 1 ? "border-bottom" : ""
                    }`}
                    style={{ borderColor: "#f3f4f6" }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <FaCircle
                          size={8}
                          style={{
                            color: user.status === "1" ? "#22C55E" : "#6B7280",
                          }}
                        />
                      </div>
                      <div>
                        <h6
                          className="fw-semibold mb-1"
                          style={{ color: "#1f2937" }}
                        >
                          {user.name}
                        </h6>
                        <Badge
                          bg={user.status === "1" ? "success" : "secondary"}
                          className="rounded-pill px-2 py-1"
                          style={{ fontSize: "11px" }}
                        >
                          {/* {user.status === "1" ? "Checked In" : "Checked Out"} */}
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    {/* <div className="text-end">
                      <p className="text-muted small mb-1">
                        {formatDateDDMMYYYY(user.updatedAt)}
                      </p>
                      <p className="text-muted small mb-0">
                        {new Date(user.updatedAt).toLocaleTimeString()}
                      </p>
                    </div> */}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <FaBell size={48} className="text-muted mb-3" />
                <h6 className="text-muted">No recent activity</h6>
                <p className="text-muted small">
                  Users will appear here when they check in or out
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default RecentActivities;
