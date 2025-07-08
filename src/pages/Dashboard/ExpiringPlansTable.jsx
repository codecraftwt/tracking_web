import React from "react";
import { Table, Badge, Card } from "react-bootstrap";
import { FaRupeeSign, FaUsers } from "react-icons/fa"; // Importing the icon
import { motion } from "framer-motion"; // For animation

const ExpiringPlansTable = ({ data }) => {
  return (
    <motion.div>
      <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <Card.Header
          className="border-0 p-4"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5 className="text-white fw-bold mb-1">
                Users with Expiring Plans
              </h5>
              <p className="text-white-50 mb-0 small">
                Complete list of users whose plans are expiring soon
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Badge
                bg="light"
                className="text-primary px-3 py-2 rounded-pill"
                style={{ fontSize: "14px" }}
              >
                <FaUsers className="me-2" />
                {data.length} Results
              </Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="mb-0" style={{ fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ background: "rgba(59, 130, 246, 0.05)" }}>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    User Name
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Email
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Plan Name
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Plan Description
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Price
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Expires At
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Remaining Days
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((user, index) => {
                    const rowBg = index % 2 === 0 ? "#f1f3f4" : "#fff"; // Alternate row color
                    return (
                      <motion.tr
                        key={user.userId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          Array.from(e.currentTarget.children).forEach((td) => {
                            td.style.background = "rgba(59, 130, 246, 0.1)";
                          });
                        }}
                        onMouseLeave={(e) => {
                          Array.from(e.currentTarget.children).forEach((td) => {
                            td.style.background = rowBg;
                          });
                        }}
                      >
                        <td
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          <div className="d-flex align-items-center">
                            <div>
                              <div
                                className="fw-semibold"
                                style={{ color: "#1f2937" }}
                              >
                                {user.userName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          {user.userEmail}
                        </td>
                        <td
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          {user.planName}
                        </td>
                        <td
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          {user.planDescription}
                        </td>
                        <td
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          <FaRupeeSign /> {user.planPrice}
                        </td>
                        <td
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          {user.expiresAt}
                        </td>
                        <td
                          className="border-0 p-3"
                          style={{ background: rowBg }}
                        >
                          {user.remainingDays > 0 ? (
                            <Badge bg="warning">
                              {user.remainingDays} Days
                            </Badge>
                          ) : (
                            <Badge bg="danger">Expired</Badge>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No users with expiring plans.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ExpiringPlansTable;
