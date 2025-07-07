import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Col, Row, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
  FaPlus,
  FaCreditCard,
  FaChartLine,
  FaBell,
  FaArrowRight,
  FaCircle,
} from "react-icons/fa";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [mostRecentUsers, setMostRecentUsers] = useState([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);

  const userData = useSelector((state) => state.UserData.userInfo);

  useEffect(() => {
    dispatch(getAllUsers(userData?._id)).then((response) => {
      const users = response.payload || [];

      const today = new Date().toISOString().split("T")[0];

      const checkedOutUsers = users.filter(
        (user) => user.status === "0" && user.updatedAt?.split("T")[0] === today
      );
      const checkedInUsers = users.filter(
        (user) => user.status === "1" && user.updatedAt?.split("T")[0] === today
      );

      setCheckedOutCount(checkedOutUsers.length);
      setCheckedInCount(checkedInUsers.length);

      const usersUpdatedToday = users.filter(
        (user) => user.updatedAt?.split("T")[0] === today
      );

      const sortedUsers = usersUpdatedToday.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      const recentUsers = sortedUsers.slice(0, 3);
      setMostRecentUsers(recentUsers);

      const activeUsers = users.filter((user) => user.isActive === true);
      const inactiveUsers = users.filter((user) => user.isActive === false);

      setTotalActiveUsers(activeUsers.length);
      setTotalInActiveUsers(inactiveUsers.length);
    });
  }, [dispatch]);

  const userStats = [
    {
      key: "activeUsers",
      label: "Active Users",
      count: totalActiveUsers,
      icon: <FaUsers size={24} />,
      color: "primary",
      bgColor: "rgba(59, 130, 246, 0.1)",
      iconColor: "#3B82F6",
    },
    {
      key: "inactiveUsers",
      label: "Inactive Users",
      count: totalInActiveUsers,
      icon: <FaUserTimes size={24} />,
      color: "secondary",
      bgColor: "rgba(107, 114, 128, 0.1)",
      iconColor: "#6B7280",
    },
    {
      key: "checkedInUsers",
      label: "Checked In",
      count: checkedInCount,
      icon: <FaUserCheck size={24} />,
      color: "success",
      bgColor: "rgba(34, 197, 94, 0.1)",
      iconColor: "#22C55E",
    },
    {
      key: "checkedOutUsers",
      label: "Checked Out",
      count: checkedOutCount,
      icon: <FaUserClock size={24} />,
      color: "warning",
      bgColor: "rgba(245, 158, 11, 0.1)",
      iconColor: "#F59E0B",
    },
  ];

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
      <Navbar pageTitle="Admin Dashboard" />
      <motion.main
        className="container-fluid py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Stats Cards */}
            <motion.section variants={itemVariants} className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                {/* Left Side: Icon + Title */}
                <div className="d-flex align-items-center mb-2 mb-sm-0">
                  <FaChartLine className="me-2" style={{ color: "#3B82F6" }} />
                  <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                    Tracking Overview
                  </h5>
                </div>

                {/* Right Side: Badge */}
                <Badge
                  bg="primary"
                  className="px-3 py-2 rounded-pill"
                  style={{ fontSize: "14px", whiteSpace: "nowrap" }}
                >
                  <FaBell className="me-2" />
                  Live Updates
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
                          backgroundColor: "#fff",
                          cursor:
                            stat.key === "checkedInUsers"
                              ? "pointer"
                              : "default",
                        }}
                        onClick={() => {
                          if (stat.key === "checkedInUsers") {
                            navigate("/active-locations"); // 👈 Navigate here
                          }
                        }}
                      >
                        <Card.Body className="p-4">
                          <div className="d-flex justify-content-between align-items-center">
                            {/* Left Section: Label and Count */}
                            <div>
                              <p
                                className="text-muted small mb-1"
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
                                backgroundColor: stat.bgColor || "#F3F4F6", // light neutral
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

            {/* Recent Activities */}
            <motion.section variants={itemVariants} className="mb-5">
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

              <motion.div variants={cardVariants}>
                <Card
                  className="border-0 shadow-sm"
                  style={{ borderRadius: "16px" }}
                >
                  <Card.Body className="p-0">
                    {mostRecentUsers.length > 0 ? (
                      <div>
                        {mostRecentUsers.map((user, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`d-flex justify-content-between align-items-center p-4 ${
                              index !== mostRecentUsers.length - 1
                                ? "border-bottom"
                                : ""
                            }`}
                            style={{ borderColor: "#f3f4f6" }}
                          >
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <FaCircle
                                  size={8}
                                  style={{
                                    color:
                                      user.status === "1"
                                        ? "#22C55E"
                                        : "#6B7280",
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
                                  bg={
                                    user.status === "1"
                                      ? "success"
                                      : "secondary"
                                  }
                                  className="rounded-pill px-2 py-1"
                                  style={{ fontSize: "11px" }}
                                >
                                  {user.status === "1"
                                    ? "Checked In"
                                    : "Checked Out"}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-end">
                              <p className="text-muted small mb-1">
                                {new Date(user.updatedAt).toLocaleDateString()}
                              </p>
                              <p className="text-muted small mb-0">
                                {new Date(user.updatedAt).toLocaleTimeString()}
                              </p>
                            </div>
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

            {/* Quick Actions
            <motion.section variants={itemVariants}>
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
                        <h5 className="fw-bold mb-2">Add New User</h5>
                        <p className="mb-0 opacity-75">
                          Register a new user to the system
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
                        background: "linear-gradient(135deg, #10B981, #059669)"
                      }}
                      onClick={() => navigate("/payment-plans")}
                    >
                      <Card.Body className="p-4 text-white text-center">
                        <FaCreditCard size={32} className="mb-3" />
                        <h5 className="fw-bold mb-2">Payment Plans</h5>
                        <p className="mb-0 opacity-75">
                          Manage subscription and payment plans
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

export default AdminDashboard;
