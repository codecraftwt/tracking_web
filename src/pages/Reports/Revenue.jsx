import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarAlt,
  FaChartLine,
  FaRupeeSign,
} from "react-icons/fa";
import StatsCard from "./StatsCard";
import SearchFilter from "./SearchFilter";
import RevenueTable from "./RevenueTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentHistory } from "../../redux/slices/paymentSlice";
import moment from "moment";

const Revenue = () => {
  const dispatch = useDispatch();
  const { allPaymentHistory, allPaymentHistoryLoading, totalCompletedAmount } =
    useSelector((state) => state.PaymentData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");

  useEffect(() => {
    dispatch(getAllPaymentHistory());
  }, [dispatch]);

  // Transform payment history data for display
  const transformPaymentData = () => {
    if (!allPaymentHistory) return [];

    return allPaymentHistory.map((payment) => ({
      id: payment._id,
      name: payment.adminId?.name || "Unknown",
      email: payment.adminId?.email || "",
      date: moment(payment.createdAt).format("YYYY-MM-DD"),
      amount: payment.amount,
      status: payment.status,
      plan: payment.planId?.name || "Unknown Plan",
      paymentMethod: payment.paymentMethod,
      duration: payment.duration,
      addOns: payment.addOns,
      expiresAt: payment.expiresAt,
      remainingDays: payment.remainingDays,
    }));
  };

  const paymentData = transformPaymentData();

  // Calculate metrics
  const totalRevenue =
    totalCompletedAmount ||
    paymentData.reduce((sum, payment) => sum + payment.amount, 0);
  const totalUsers = paymentData.length;
  const averageRevenue = totalRevenue / (totalUsers || 1); // Avoid division by zero

  // Filter payments
  const filteredPayments = paymentData.filter((payment) => {
    const matchesSearch =
      payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth =
      filterMonth === "all" || payment.date.startsWith(filterMonth);
    return matchesSearch && matchesMonth;
  });

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

  if (allPaymentHistoryLoading) {
    return (
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{ background: "#f8fafc" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Revenue Analytics" />

      <motion.main
        className="container-fluid py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="mb-3">
              <Row className="g-2">
                <Col xs={6} sm={3}>
                  <StatsCard
                    icon={FaRupeeSign}
                    value={totalRevenue.toLocaleString("en-IN")}
                    label="Total Revenue"
                    iconBg="rgba(34, 197, 94, 0.1)"
                    iconColor="#22C55E"
                  />
                </Col>
                <Col xs={6} sm={3}>
                  <StatsCard
                    icon={FaUsers}
                    value={totalUsers}
                    label="Paid Users"
                    iconBg="rgba(59, 130, 246, 0.1)"
                    iconColor="#3B82F6"
                  />
                </Col>
                <Col xs={6} sm={3}>
                  <StatsCard
                    icon={FaChartLine}
                    value={averageRevenue.toFixed(0)}
                    label="Average Revenue"
                    iconBg="rgba(168, 85, 247, 0.1)"
                    iconColor="#A855F7"
                  />
                </Col>
                <Col xs={6} sm={3}>
                  <StatsCard
                    icon={FaCalendarAlt}
                    value={new Date().getMonth() + 1}
                    label="Current Month"
                    iconBg="rgba(245, 158, 11, 0.1)"
                    iconColor="#F59E0B"
                  />
                </Col>
              </Row>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div variants={itemVariants} className="mb-4">
              <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterMonth={filterMonth}
                setFilterMonth={setFilterMonth}
                resultsCount={filteredPayments.length}
              />
            </motion.div>

            {/* Revenue Table */}
            <motion.div variants={itemVariants}>
              <RevenueTable
                filteredPayments={filteredPayments}
                totalRevenue={totalRevenue}
                searchQuery={searchQuery}
              />
            </motion.div>
          </Col>
        </Row>
      </motion.main>
    </div>
  );
};

export default Revenue;
