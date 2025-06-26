import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaHistory, FaCalendarAlt, FaDollarSign, FaArrowUp, FaArrowDown, FaCheckCircle, FaClock } from "react-icons/fa";
import { Card, Badge, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const { 
    paymentHistory, 
    historyLoading, 
    historyError 
  } = useSelector((state) => state.PaymentData);

  useEffect(() => {
    if (isAuthenticated && user) {
      const adminId = user._id || user.id || user.userId;
      if (adminId) {
        dispatch(getPaymentHistory(adminId));
      }
    }
  }, [dispatch, isAuthenticated, user]);

  const getStatusIcon = (status) => {
    return status === "completed" ? <FaCheckCircle /> : <FaClock />;
  };

  const getStatusColor = (status) => {
    return status === "completed" ? "#10B981" : "#F59E0B";
  };

  const getAmountIcon = (amount) => {
    return amount > 0 ? <FaArrowUp /> : <FaArrowDown />;
  };

  const getAmountColor = (amount) => {
    return amount > 0 ? "#10B981" : "#EF4444";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Transaction History" />
      <main className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div className="d-flex align-items-center mb-2 mb-sm-0">
                <FaHistory className="me-2" style={{ color: "#3B82F6" }} />
                <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                  Transaction History
                </h5>
              </div>
              <div className="d-flex gap-2">
                <Badge
                  bg="primary"
                  className="px-3 py-2 rounded-pill"
                  style={{ 
                    fontSize: "14px", 
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {paymentHistory?.length || 0} Transactions
                </Badge>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    if (isAuthenticated && user) {
                      const adminId = user._id || user.id || user.userId;
                      if (adminId) {
                        dispatch(getPaymentHistory(adminId));
                      }
                    }
                  }}
                  disabled={historyLoading}
                >
                  {historyLoading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* Error Alert */}
            {historyError && (
              <Alert 
                variant="danger" 
                dismissible 
                className="mb-4"
              >
                <Alert.Heading>Error Loading Transactions</Alert.Heading>
                <p>{historyError}</p>
              </Alert>
            )}

            {/* Loading State */}
            {historyLoading ? (
              <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: "12px" }}>
                <Card.Body>
                  <Loader text="Loading transaction history..." />
                </Card.Body>
              </Card>
            ) : (
              /* Transactions List */
              <div className="d-flex flex-column gap-3">
                {paymentHistory && paymentHistory.length > 0 ? (
                  paymentHistory.map((transaction, index) => (
                    <Card 
                      key={transaction._id || index} 
                      className="border-0 shadow-sm" 
                      style={{ 
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                      }}
                    >
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                              style={{ 
                                width: '40px', 
                                height: '40px',
                                backgroundColor: getAmountColor(transaction.amount) + '20',
                                color: getAmountColor(transaction.amount),
                                transition: "all 0.3s ease"
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.1)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            >
                              {getAmountIcon(transaction.amount)}
                            </div>
                            <div>
                              <h6 className="fw-semibold mb-1" style={{ color: "#1f2937" }}>
                                {transaction.description || `Payment for ${transaction.planId?.name || 'Plan'}`}
                              </h6>
                              <div className="d-flex align-items-center">
                                <FaCalendarAlt className="me-1" style={{ color: "#6B7280", fontSize: "12px" }} />
                                <small className="text-muted">
                                  {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
                                </small>
                              </div>
                              {transaction.planId && (
                                <small className="text-muted d-block">
                                  Plan: {transaction.planId.name} ({transaction.planId.duration})
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="text-end">
                            <div 
                              className="fw-bold mb-2"
                              style={{ 
                                color: getAmountColor(transaction.amount),
                                fontSize: "18px",
                                transition: "all 0.3s ease"
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            >
                              {formatAmount(transaction.amount)}
                            </div>
                            <Badge 
                              bg={transaction.status === "completed" ? "success" : "warning"}
                              className="px-3 py-2"
                              style={{ 
                                fontSize: "12px",
                                transition: "all 0.3s ease"
                              }}
                              onMouseOver={(e) => {
                                e.target.style.transform = "scale(1.1)";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = "scale(1)";
                              }}
                            >
                              <span className="me-1">
                                {getStatusIcon(transaction.status)}
                              </span>
                              {transaction.status}
                            </Badge>
                            {transaction.paymentMethod && (
                              <small className="text-muted d-block mt-1">
                                {transaction.paymentMethod}
                              </small>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  /* Empty State */
                  <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: "12px" }}>
                    <Card.Body>
                      <FaHistory size={48} className="text-muted mb-3" />
                      <h6 className="text-muted">No transactions found</h6>
                      <p className="text-muted small">
                        Your transaction history will appear here after making payments.
                      </p>
                    </Card.Body>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
