import React, { useState } from "react";
import { Card, Table, Badge, Accordion, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaRupeeSign,
  FaInfoCircle,
  FaClock,
} from "react-icons/fa";
import moment from "moment";
import { useSelector } from "react-redux";

const RevenueTable = ({
  filteredPayments,
  totalRevenue,
  searchQuery,
  page,
  handlePageChange,
}) => {
  const {
    currentPage = 1,
    totalItems = 0,
    totalPages = 0,
  } = useSelector((state) => state.PaymentData || {});

  return (
    <>
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
              <h5 className="text-white fw-bold mb-1">Payment History</h5>
              <p className="text-white-50 mb-0 small">
                Complete breakdown of all payment transactions
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Badge
                bg="light"
                className="text-primary px-3 py-2 rounded-pill"
                style={{ fontSize: "14px" }}
              >
                <FaRupeeSign className="me-2" />
                {totalRevenue.toLocaleString("en-IN")}
              </Badge>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="mb-0 small">
              <thead>
                <tr style={{ background: "rgba(59, 130, 246, 0.05)" }}>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Customer
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Plan
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Payment Date
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold"
                    style={{ color: "#374151" }}
                  >
                    Expires On
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold text-end"
                    style={{ color: "#374151" }}
                  >
                    Amount
                  </th>
                  <th
                    className="border-0 p-3 fw-semibold text-center"
                    style={{ color: "#374151" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => (
                  <React.Fragment key={payment.id}>
                    <TableRow payment={payment} index={index} />
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>

          {filteredPayments.length === 0 && (
            <EmptyState searchQuery={searchQuery} />
          )}
        </Card.Body>
      </Card>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center my-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${page === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, idx) => (
                <li
                  key={idx}
                  className={`page-item ${page === idx + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

const TableRow = ({ payment, index }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Format expiry date with relative time (e.g., "in 30 days")
  const formatExpiryDate = (date) => {
    const expiryMoment = moment(date);
    const formattedDate = expiryMoment.format("DD MMM YYYY");
    const relativeTime = expiryMoment.fromNow();
    return `${formattedDate} (${relativeTime})`;
  };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(59, 130, 246, 0.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
        onClick={() => setShowDetails(!showDetails)}
      >
        <td className="border-0 p-3">
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {payment.name.charAt(0)}
            </div>
            <div>
              <div className="fw-semibold" style={{ color: "#1f2937" }}>
                {payment.name}
              </div>
              <div className="text-muted small">{payment.email}</div>
            </div>
          </div>
        </td>
        <td className="border-0 p-3">
          <Badge
            bg={
              payment.plan.includes("Premium")
                ? "success"
                : payment.plan.includes("Enterprise")
                ? "primary"
                : payment.plan.includes("Standard")
                ? "warning"
                : "secondary"
            }
            className="rounded-pill px-3 py-2"
            style={{ fontSize: "12px" }}
          >
            {payment.plan}
          </Badge>
        </td>
        <td className="border-0 p-3">
          <div className="d-flex align-items-center">
            <FaCalendarAlt className="me-2 text-muted" size={14} />
            <span className="text-muted">{payment.date}</span>
          </div>
        </td>
        <td className="border-0 p-3">
          <div className="d-flex align-items-center">
            <FaClock className="me-2 text-muted" size={14} />
            <span
              className={
                moment(payment.expiresAt).isBefore(moment())
                  ? "text-danger"
                  : "text-success"
              }
            >
              {formatExpiryDate(payment.expiresAt)}
            </span>
          </div>
        </td>
        <td className="border-0 p-3 text-end">
          <span className="fw-bold text-success fs-6">
            <FaRupeeSign size={12} className="me-1" />
            {payment.amount.toLocaleString("en-IN")}
          </span>
        </td>
        <td className="border-0 p-3 text-center">
          <Badge
            bg={payment.status === "completed" ? "success" : "danger"}
            className="rounded-pill px-3 py-2"
            style={{ fontSize: "12px" }}
          >
            {payment.status}
          </Badge>
        </td>
      </motion.tr>

      {showDetails && (
        <tr>
          <td colSpan={6} className="p-0">
            <div className="px-4 py-3 bg-light">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="fw-bold">Payment Details</h6>
                  <ul className="list-unstyled small">
                    <li>
                      <strong>Payment Method:</strong> {payment.paymentMethod}
                    </li>
                    <li>
                      <strong>Duration:</strong> {payment.duration}
                    </li>
                    <li>
                      <strong>Expires At:</strong>{" "}
                      {moment(payment.expiresAt).format("LLL")}
                    </li>
                    <li>
                      <strong>Remaining Days:</strong> {payment.remainingDays}
                    </li>
                  </ul>
                </div>
                {payment.addOns?.length > 0 && (
                  <div className="col-md-6">
                    <h6 className="fw-bold">Add-Ons</h6>
                    <ul className="list-unstyled small">
                      {payment.addOns.map((addOn, i) => (
                        <li key={i}>
                          <strong>Add-On:</strong> {addOn.addOnDescription} (+
                          <FaRupeeSign size={10} />
                          {addOn.addOnAmount})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const EmptyState = ({ searchQuery }) => (
  <div className="text-center py-5">
    <div className="mb-3">
      <FaRupeeSign size={48} className="text-muted" />
    </div>
    <h6 className="text-muted">No payment data found</h6>
    <p className="text-muted small">
      {searchQuery
        ? "Try adjusting your search criteria"
        : "No transactions available"}
    </p>
  </div>
);

export default RevenueTable;
