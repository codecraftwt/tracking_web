import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserById } from "../../redux/slices/userSlice";
import { motion } from "framer-motion";
import { FaUsers, FaUserCheck, FaUserTimes, FaUserClock } from "react-icons/fa";
import CurrentPlan from "./CurrentPlan";
import RecentActivities from "./RecentActivities";
import StatsCards from "./StatsCards";

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
    dispatch(getUserById(userData._id));
  }, [dispatch, userData._id]);

  useEffect(() => {
    dispatch(getAllUsers(userData?._id)).then((response) => {
      const users = response.payload.users || [];

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
      onClick: (navigate) => navigate("/active-locations"),
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
            <StatsCards stats={userStats} />

            {userData?.currentPaymentId && (
              <motion.section variants={itemVariants} className="mb-5">
                <CurrentPlan currentPlan={userData?.currentPaymentId} />
              </motion.section>
            )}

            {/* Recent Activities */}
            <RecentActivities users={mostRecentUsers} />

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
