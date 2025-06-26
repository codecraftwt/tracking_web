import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Col, Row, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserCounts } from "../../redux/slices/userSlice";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
  FaPlus,
  FaCog,
  FaChartLine,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userCounts = useSelector((state) => state.UserData.userCounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCounts());
  }, []);

  const userStats = [
    {
      key: "activeAdmins",
      label: "Active Admins",
      icon: <FaUserShield size={24} />,
      color: "primary",
      bgColor: "rgba(59, 130, 246, 0.1)",
      iconColor: "#3B82F6",
    },
    {
      key: "inactiveAdmins",
      label: "Inactive Admins",
      icon: <FaUserTimes size={24} />,
      color: "secondary",
      bgColor: "rgba(107, 114, 128, 0.1)",
      iconColor: "#6B7280",
    },
    {
      key: "allActiveUsers",
      label: "All Active Users",
      icon: <FaUserCheck size={24} />,
      color: "success",
      bgColor: "rgba(34, 197, 94, 0.1)",
      iconColor: "#22C55E",
    },
    {
      key: "allInactiveUsers",
      label: "All Inactive Users",
      icon: <FaUsers size={24} />,
      color: "warning",
      bgColor: "rgba(245, 158, 11, 0.1)",
      iconColor: "#F59E0B",
    },
  ];

  const revenueData = {
    total: 24500,
    thisMonth: 18200,
    lastMonth: 6300,
    thisMonthGrowth: 12.5,
    lastMonthGrowth: -3.2,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Dashboard" />
      <motion.main
        className="container-fluid py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Revenue Section */}

            {/* Tracking Overview Section */}
            <motion.section variants={itemVariants} className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <div className="d-flex align-items-center mb-2 mb-sm-0">
                  <FaChartLine className="me-2" style={{ color: "#3B82F6" }} />
                  <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                    Tracking Overview
                  </h5>
                </div>

                <Badge
                  bg="success"
                  className="px-3 py-2 rounded-pill"
                  style={{ fontSize: "14px", whiteSpace: "nowrap" }}
                >
                  <FaChartLine className="me-2" />
                  Live Analytics
                </Badge>
              </div>

              <Row className="g-4">
                {userStats.map((stat, index) => (
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
                          overflow: "hidden",
                          backgroundColor: "#fff",
                        }}
                      >
                        <Card.Body className="p-4">
                          <div className="d-flex justify-content-between align-items-center">
                            {/* Left Section: Label + Count */}
                            <div>
                              <p
                                className="text-muted mb-1 small"
                                style={{ fontWeight: 500 }}
                              >
                                {stat.label}
                              </p>
                              <h3
                                className="fw-bold mb-0"
                                style={{
                                  color: "#111827",
                                  fontSize: "1.75rem",
                                }}
                              >
                                {userCounts?.[stat.key] || 0}
                              </h3>
                            </div>

                            {/* Right Section: Icon */}
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                backgroundColor: stat.bgColor || "#E5F4EC", // fallback
                              }}
                            >
                              <span
                                style={{ color: stat.iconColor || "#10B981" }}
                              >
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
            <motion.section variants={itemVariants} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <FaDollarSign className="me-2" style={{ color: "#3B82F6" }} />
                <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                  Revenue Overview
                </h5>
              </div>
              <motion.div variants={cardVariants}>
              <Card
  className="border-0 shadow-sm"
  style={{
    borderRadius: "16px",
    background: "linear-gradient(135deg, #334155, #1e293b)", // smoky dark slate tones
    color: "#fff",
  }}
>
  <Card.Body className="p-4">
    {/* Header Section */}
    <div className="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h6 className="text-white-50 mb-1">Total Revenue</h6>
        <h2 className="fw-bold mb-0">
          ${revenueData.total.toLocaleString()}
        </h2>
      </div>
      <div className="text-end">
        <Badge
          bg="light"
          text="dark"
          className="rounded-pill px-2 py-1 mb-2"
          style={{ fontSize: "12px" }}
        >
          <FaArrowUp className="me-1 text-success" size={10} />
          +{revenueData.thisMonthGrowth}%
        </Badge>
        <p className="text-white-50 small mb-0">This Month</p>
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
                ${revenueData.thisMonth.toLocaleString()}
              </h5>
              <p className="text-white-50 small mb-0">This Month</p>
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
                ${revenueData.lastMonth.toLocaleString()}
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

            {/* Quick Actions Section */}
            {/* <motion.section variants={itemVariants}>
              <div className="d-flex align-items-center mb-4">
                <FaPlus className="me-2" style={{ color: "#3B82F6" }} />
                <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                  Quick Actions
                </h5>
              </div>
              <Row className="g-4">
                <Col xs={12} sm={6}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="border-0 shadow-sm h-100 cursor-pointer"
                      style={{ 
                        borderRadius: "16px",
                        cursor: "pointer",
                        background: "linear-gradient(135deg, #3B82F6, #2563EB)"
                      }}
                      onClick={() => navigate("/add-admin")}
                    >
                      <Card.Body className="p-4 text-white text-center">
                        <FaPlus size={32} className="mb-3" />
                        <h5 className="fw-bold mb-2">Add New Admin</h5>
                        <p className="mb-0 opacity-75">
                          Register a new administrator to your organization
                        </p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
                <Col xs={12} sm={6}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="border-0 shadow-sm h-100 cursor-pointer"
                      style={{ 
                        borderRadius: "16px",
                        cursor: "pointer",
                        background: "linear-gradient(135deg, #8B5CF6, #7C3AED)"
                      }}
                      onClick={() => navigate("/manage-plans")}
                    >
                      <Card.Body className="p-4 text-white text-center">
                        <FaCog size={32} className="mb-3" />
                        <h5 className="fw-bold mb-2">Manage Active Plans</h5>
                        <p className="mb-0 opacity-75">
                          Configure and manage subscription plans
                        </p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              </Row>
            </motion.section> */}
          </Col>
        </Row>
      </motion.main>
    </div>
  );
};

export default Dashboard;
