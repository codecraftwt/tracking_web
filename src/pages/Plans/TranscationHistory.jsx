import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaHistory, FaCalendarAlt, FaDollarSign, FaArrowUp, FaArrowDown, FaCheckCircle, FaClock } from "react-icons/fa";
import { Card, Badge, Row, Col } from "react-bootstrap";

const TransactionHistory = () => {
  const transactions = [
    { date: "2023-10-01", description: "For new 1-10 Users", amount: "-$50.00", status: "Completed" },
    { date: "2023-10-02", description: "Recharge the plan", amount: "+$2000.00", status: "Completed" },
    { date: "2023-10-03", description: "For new 10-20 Users", amount: "-$120.00", status: "Pending" },
    { date: "2023-10-04", description: "Recharge the plan", amount: "-$75.00", status: "Completed" },
    { date: "2023-10-05", description: "Recharge the plan", amount: "+$500.00", status: "Completed" },
  ];

  const getStatusIcon = (status) => {
    return status === "Completed" ? <FaCheckCircle /> : <FaClock />;
  };

  const getStatusColor = (status) => {
    return status === "Completed" ? "#10B981" : "#F59E0B";
  };

  const getAmountIcon = (amount) => {
    return amount.startsWith("+") ? <FaArrowUp /> : <FaArrowDown />;
  };

  const getAmountColor = (amount) => {
    return amount.startsWith("+") ? "#10B981" : "#EF4444";
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
                {transactions.length} Transactions
              </Badge>
            </div>

            {/* Summary Cards */}
       
            {/* Transactions List */}
            <div className="d-flex flex-column gap-3">
              {transactions.map((transaction, index) => (
                <Card 
                  key={index} 
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
                            {transaction.description}
                          </h6>
                          <div className="d-flex align-items-center">
                            <FaCalendarAlt className="me-1" style={{ color: "#6B7280", fontSize: "12px" }} />
                            <small className="text-muted">
                              {formatDate(transaction.date)} at {formatTime(transaction.date)}
                            </small>
                          </div>
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
                          {transaction.amount}
                        </div>
                        <Badge 
                          bg={transaction.status === "Completed" ? "success" : "warning"}
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
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {transactions.length === 0 && (
              <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: "12px" }}>
                <Card.Body>
                  <FaHistory size={48} className="text-muted mb-3" />
                  <h6 className="text-muted">No transactions found</h6>
                  <p className="text-muted small">
                    Your transaction history will appear here.
                  </p>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
