import React, { useEffect } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { FaRupeeSign, FaArrowUp, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getRevenueSummary } from "../../redux/slices/paymentSlice";

const RevenueOverview = () => {
  const dispatch = useDispatch();
  const { revenueSummary, revenueLoading, revenueError } = useSelector(
    (state) => state.PaymentData
  );

  // Dispatch the action to fetch revenue data on component mount
  useEffect(() => {
    dispatch(getRevenueSummary());
  }, [dispatch]);

  // Log the data for debugging
  console.log("Revenue Data:", revenueSummary);
  console.log("Revenue Loading:", revenueLoading);
  console.log("Revenue Error:", revenueError);

  // Handle loading state
  if (revenueLoading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner if needed
  }

  // Handle error state
  if (revenueError) {
    return <div>Error: {revenueError}</div>; // Display error message
  }

  // If no revenue data available
  if (!revenueSummary) {
    return <div>No revenue data available</div>;
  }

  // Card animation variants for smooth transition
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section className="mb-5">
      <div className="d-flex align-items-center mb-4">
        <FaRupeeSign className="me-2" style={{ color: "#3B82F6" }} />
        <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
          Revenue Overview
        </h5>
      </div>

      {/* Card Wrapper with animation */}
      <motion.div variants={cardVariants}>
        <Card
          className="border-0 shadow-sm"
          style={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, #334155, #1e293b)", // smoky dark slate tones
            color: "#fff",
            minHeight: "200px",
            overflow: "visible",
          }}
        >
          <Card.Body className="p-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h6 className="text-white-50 mb-1">Total Revenue</h6>
                <h2 className="fw-bold mb-0">
                  {/* Ensure revenue data is properly formatted */}
                  {revenueSummary.totalRevenue
                    ? revenueSummary.totalRevenue.toLocaleString()
                    : "N/A"}
                </h2>
              </div>
              <div className="text-end">
                <Badge
                  bg="light"
                  text="dark"
                  className="rounded-pill px-2 py-1 mb-2"
                  style={{ fontSize: "12px" }}
                >
                  <FaArrowUp className="me-1 text-success" size={10} />+
                  {revenueSummary.growthPercentage
                    ? revenueSummary.growthPercentage.toFixed(2)
                    : "0.00"}{" "}
                  %
                </Badge>
                <p className="text-white-50 small mb-0">Growth</p>
              </div>
            </div>

            {/* Monthly Summary Section */}
            <Row className="g-3">
              <Col sm={6}>
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-1">
                        {revenueSummary.currentMonthRevenue
                          ? revenueSummary.currentMonthRevenue.toLocaleString()
                          : "N/A"}
                      </h5>
                      <p className="text-white-50 small mb-0">Current Month</p>
                    </div>
                    <FaCalendarAlt size={20} className="text-white-50" />
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-1">
                        {revenueSummary.lastMonthRevenue
                          ? revenueSummary.lastMonthRevenue.toLocaleString()
                          : "N/A"}
                      </h5>
                      <p className="text-white-50 small mb-0">Last Month</p>
                    </div>
                    <FaCalendarAlt size={20} className="text-white-50" />
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default RevenueOverview;
