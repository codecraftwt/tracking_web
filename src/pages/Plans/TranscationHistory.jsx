import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import {
  FaHistory,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaSyncAlt,
  FaTable,
  FaThList,
} from "react-icons/fa";
import {
  FiArrowUpRight,
  FiArrowDownLeft,
  FiDownload,
  FiPrinter,
} from "react-icons/fi";
import {
  Card,
  Badge,
  Row,
  Col,
  Alert,
  Dropdown,
  Button,
  Spinner,
  Container,
  ListGroup,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import { useAuth } from "../../context/AuthContext";
import ReceiptModal from "../../components/modals/ReceiptModal";
import { motion } from "framer-motion";

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const { paymentHistory, historyLoading, historyError } = useSelector(
    (state) => state.PaymentData
  );
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [expandedAddOns, setExpandedAddOns] = useState({});
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table"); // 'card' or 'table'

  useEffect(() => {
    if (isAuthenticated && user) {
      const adminId = user._id || user.id || user.userId;
      if (adminId) {
        dispatch(getPaymentHistory(adminId));
      }
    }
  }, [dispatch, isAuthenticated, user]);

  const toggleAddOns = (transactionId) => {
    setExpandedAddOns((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  const filteredTransactions = paymentHistory?.filter((transaction) => {
    if (filter === "all") return true;
    if (filter === "completed") return transaction.status === "completed";
    if (filter === "pending") return transaction.status === "pending";
    return true;
  });

  const sortedTransactions = [...(filteredTransactions || [])].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "highest") return b.amount - a.amount;
    if (sortBy === "lowest") return a.amount - b.amount;
    return 0;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const refreshData = () => {
    if (isAuthenticated && user) {
      const adminId = user._id || user.id || user.userId;
      if (adminId) {
        dispatch(getPaymentHistory(adminId));
      }
    }
  };

  return (
    <div className="min-vh-100 bg-gray-50">
      <Navbar pageTitle="Transaction History" />

      <main className="px-5">
        {/* Header Section */}
        <div className="bg-white py-4 px-4 border-bottom">
          <Container fluid className="px-0">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex align-items-center">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center"
                  style={{ width: "50px", height: "50px", padding: 0 }}
                >
                  <FaHistory className="text-primary" size={20} />
                </div>

                <div>
                  <h4 className="fw-bold mb-0">Transaction History</h4>
                  <small className="text-muted">
                    View all your payment transactions
                  </small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button
                  variant="light"
                  className="d-flex align-items-center gap-2"
                  onClick={refreshData}
                  disabled={historyLoading}
                >
                  {historyLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FaSyncAlt />
                  )}
                  <span>Refresh</span>
                </Button>

                <Button
                  variant="outline-secondary"
                  className="d-flex align-items-center gap-2"
                  onClick={toggleViewMode}
                >
                  {viewMode === "card" ? <FaTable /> : <FaThList />}
                  <span>
                    {viewMode === "card" ? "Table View" : "Card View"}
                  </span>
                </Button>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    className="d-flex align-items-center gap-2"
                  >
                    <span>
                      Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setFilter("all")}>
                      All Transactions
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("completed")}>
                      Completed
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setFilter("pending")}>
                      Pending
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    className="d-flex align-items-center gap-2"
                  >
                    <span>
                      Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSortBy("newest")}>
                      Newest First
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy("oldest")}>
                      Oldest First
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy("highest")}>
                      Highest Amount
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSortBy("lowest")}>
                      Lowest Amount
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Summary */}
        <Container fluid className="px-2 py-3 bg-light border-bottom">
          <Row className="g-3">
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Total Transactions</h6>
                      <h4 className="fw-bold">{paymentHistory?.length || 0}</h4>
                    </div>
                    <div
                      className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center"
                      style={{ width: "45px", height: "45px", padding: 0 }}
                    >
                      <FaHistory className="text-primary" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Completed</h6>
                      <h4 className="fw-bold">
                        {paymentHistory?.filter((t) => t.status === "completed")
                          .length || 0}
                      </h4>
                    </div>
                    <div
                      className="bg-success bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center"
                      style={{ width: "45px", height: "45px", padding: 0 }}
                    >
                      <FaCheckCircle className="text-success" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Pending/Cancelled</h6>
                      <h4 className="fw-bold">
                        {paymentHistory?.filter((t) => t.status === "pending")
                          .length || 0}
                      </h4>
                    </div>
                    <div
                      className="bg-warning bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center"
                      style={{ width: "45px", height: "45px", padding: 0 }}
                    >
                      <FaClock className="text-warning" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Total Amount</h6>
                      <h4 className="fw-bold">
                        {formatAmount(
                          paymentHistory?.reduce(
                            (sum, t) => sum + t.amount,
                            0
                          ) || 0
                        )}
                      </h4>
                    </div>
                    <div
                      className="bg-info bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center"
                      style={{ width: "45px", height: "45px", padding: 0 }}
                    >
                      <FiArrowUpRight className="text-info" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Error Alert */}
        {historyError && (
          <Container fluid className="px-4 py-3">
            <Alert variant="danger" dismissible>
              <Alert.Heading>Error Loading Transactions</Alert.Heading>
              <p>{historyError}</p>
            </Alert>
          </Container>
        )}

        {/* Transactions List */}
        <Container fluid className="px-0">
          {historyLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Spinner animation="border" variant="primary" />
              <span className="ms-3">Loading transactions...</span>
            </div>
          ) : (
            <div className="bg-white">
              {sortedTransactions && sortedTransactions.length > 0 ? (
                viewMode === "card" ? (
                  <ListGroup variant="flush">
                    {sortedTransactions.map((transaction, index) => (
                      <motion.div
                        key={transaction._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ListGroup.Item
                          className="border-0 px-4 py-3 hover-bg-light"
                          action
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowReceipt(true);
                          }}
                        >
                          <Container fluid>
                            <Row className="align-items-center">
                              <Col md={8}>
                                <div className="d-flex align-items-center">
                                  <div
                                    className={`me-3 rounded-circle d-flex justify-content-center align-items-center ${
                                      transaction.amount > 0
                                        ? "bg-success bg-opacity-10 text-success"
                                        : "bg-danger bg-opacity-10 text-danger"
                                    }`}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      padding: 0,
                                    }}
                                  >
                                    {transaction.amount > 0 ? (
                                      <FiArrowUpRight size={20} />
                                    ) : (
                                      <FiArrowDownLeft size={20} />
                                    )}
                                  </div>

                                  <div>
                                    <h6 className="fw-bold mb-1">
                                      {transaction.description ||
                                        `Payment for ${
                                          transaction.planId?.name || "Plan"
                                        }`}
                                    </h6>
                                    <div className="d-flex align-items-center gap-3">
                                      <small className="text-muted d-flex align-items-center gap-1">
                                        <FaCalendarAlt size={12} />
                                        {formatDate(
                                          transaction.createdAt
                                        )} at{" "}
                                        {formatTime(transaction.createdAt)}
                                      </small>
                                      {transaction.paymentMethod && (
                                        <Badge
                                          bg="light"
                                          text="dark"
                                          className="rounded-pill"
                                        >
                                          {transaction.paymentMethod}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Col>

                              <Col md={4}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <h5
                                    className={`fw-bold mb-0 ${
                                      transaction.amount > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {formatAmount(transaction.amount)}
                                  </h5>
                                  <Badge
                                    bg={
                                      transaction.status === "completed"
                                        ? "success"
                                        : "warning"
                                    }
                                    className="px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                                  >
                                    {transaction.status === "completed" ? (
                                      <FaCheckCircle size={14} />
                                    ) : (
                                      <FaClock size={14} />
                                    )}
                                    <span>{transaction.status}</span>
                                  </Badge>
                                </div>
                              </Col>
                            </Row>

                            {/* Transaction Details */}
                            <Row className="mt-3">
                              <Col md={12}>
                                {transaction.planId && (
                                  <div className="d-flex align-items-center gap-2">
                                    <small className="text-muted">Plan:</small>
                                    <small className="fw-semibold">
                                      {transaction.planId.name} (
                                      {transaction.planId.duration})
                                    </small>
                                  </div>
                                )}

                                {transaction.isExpired ? (
                                  <div className="d-flex align-items-center gap-2 mt-1">
                                    <small className="text-muted">
                                      Status:
                                    </small>
                                    <small className="text-danger fw-semibold">
                                      Expired on{" "}
                                      {formatDate(transaction.expiresAt)}
                                    </small>
                                  </div>
                                ) : transaction.remainingDays > 0 ? (
                                  <div className="d-flex align-items-center gap-2 mt-1">
                                    <small className="text-muted">
                                      Expires in:
                                    </small>
                                    <small className="text-warning fw-semibold">
                                      {transaction.remainingDays} days
                                    </small>
                                  </div>
                                ) : null}

                                {/* Add-ons Section */}
                                {transaction.addOns &&
                                  transaction.addOns.length > 0 && (
                                    <div className="mt-3">
                                      <div
                                        className="d-flex align-items-center gap-2 text-primary"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleAddOns(
                                            transaction._id || index
                                          );
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <small className="fw-semibold">
                                          {transaction.addOns.length} Add-On(s)
                                        </small>
                                        {expandedAddOns[
                                          transaction._id || index
                                        ] ? (
                                          <FaChevronUp size={14} />
                                        ) : (
                                          <FaChevronDown size={14} />
                                        )}
                                      </div>

                                      {expandedAddOns[
                                        transaction._id || index
                                      ] && (
                                        <div className="mt-2 p-3 bg-light rounded-3">
                                          {transaction.addOns.map(
                                            (addOn, idx) => (
                                              <div
                                                key={idx}
                                                className="d-flex justify-content-between align-items-center mb-2"
                                              >
                                                <div>
                                                  <small className="text-muted">
                                                    Upgrade to{" "}
                                                    {addOn.addOnMaxUser} users
                                                  </small>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                  <span className="fw-bold text-success">
                                                    +
                                                    {formatAmount(
                                                      addOn.addOnAmount
                                                    )}
                                                  </span>
                                                  <Badge
                                                    bg={
                                                      addOn.status ===
                                                      "completed"
                                                        ? "success"
                                                        : "danger"
                                                    }
                                                    className="rounded-pill px-3 py-1"
                                                  >
                                                    {addOn.status}
                                                  </Badge>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}
                              </Col>
                            </Row>
                          </Container>
                        </ListGroup.Item>
                        <hr />
                      </motion.div>
                    ))}
                  </ListGroup>
                ) : (
                  <Table striped bordered hover responsive className="mb-4">
                    <thead style={{ fontSize: "0.90rem" }}>
                      <tr>
                        <th>Sr. No</th>
                        <th>Plan</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "0.85rem" }}>
                      {sortedTransactions.map((transaction, index) => (
                        <tr key={transaction._id || index}>
                          <td>{index + 1}</td>
                          <td>
                            {transaction.planId
                              ? `${transaction.planId.name} (${transaction.planId.duration})`
                              : "-"}
                          </td>
                          <td>
                            {transaction.description ||
                              `Payment for ${
                                transaction.planId?.name || "Plan"
                              }`}
                          </td>
                          <td>{formatDate(transaction.createdAt)}</td>
                          <td
                            className={
                              transaction.amount > 0
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {formatAmount(transaction.amount)}
                          </td>
                          <td>
                            <Badge
                              bg={
                                transaction.status === "completed"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                          <td>{transaction.paymentMethod || "-"}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowReceipt(true);
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )
              ) : (
                <div className="text-center py-5">
                  <FaHistory size={48} className="text-muted opacity-25 mb-3" />
                  <h5 className="text-muted fw-normal">
                    No transactions found
                  </h5>
                  <p className="text-muted small mb-4">
                    Your transaction history will appear here after making
                    payments
                  </p>
                  <Button variant="primary">Make Payment</Button>
                </div>
              )}
            </div>
          )}
        </Container>
      </main>

      {/* Receipt Modal */}
      {selectedTransaction && (
        <ReceiptModal
          transaction={selectedTransaction}
          show={showReceipt}
          onHide={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
