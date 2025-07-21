import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { Row, Col } from "react-bootstrap";
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
  const {
    allPaymentHistory,
    allPaymentHistoryLoading,
    totalCompletedAmount,
    numberOfPaidUsers,
    averageRevenue,
    totalPages,
    currentPage,
  } = useSelector((state) => state.PaymentData);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");

  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, filterMonth]);

  // Fetch payment data from backend
  useEffect(() => {
    const selectedMonth =
      filterMonth !== "all"
        ? {
            month: filterMonth.split("-")[1], // MM
            year: filterMonth.split("-")[0], // YYYY
          }
        : {};

    dispatch(
      getAllPaymentHistory({
        search: debouncedSearchQuery,
        ...selectedMonth,
        page,
      })
    );
  }, [dispatch, debouncedSearchQuery, filterMonth, page]);

  // Transform API response
  const paymentData =
    allPaymentHistory?.map((payment) => ({
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
    })) || [];

  const totalRevenue = totalCompletedAmount || 0;
  const totalUsers = numberOfPaidUsers || 0;
  const avgRevenue = averageRevenue || 0;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
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

            {/* Search and Filter */}
            <motion.div variants={itemVariants} className="mb-4">
              <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterMonth={filterMonth}
                setFilterMonth={setFilterMonth}
                resultsCount={paymentData.length}
              />
            </motion.div>

            {/* Table */}
            {allPaymentHistoryLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <motion.div variants={itemVariants}>
                <RevenueTable
                  filteredPayments={paymentData}
                  totalRevenue={totalRevenue}
                  searchQuery={searchQuery}
                  page={page}
                  handlePageChange={handlePageChange}
                />
              </motion.div>
            )}
          </Col>
        </Row>
      </motion.main>
    </div>
  );
};

export default Revenue;
