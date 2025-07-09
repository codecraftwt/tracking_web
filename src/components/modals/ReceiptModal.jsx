import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPrint, FaTimes } from "react-icons/fa";

const ReceiptModal = ({ transaction, show, onHide }) => {
  const receiptRef = useRef();

  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background: #fff;
            }
            .d-flex { display: flex; justify-content: space-between; }
            .fw-bold { font-weight: bold; }
            .fw-semibold { font-weight: 600; }
            .text-center { text-align: center; }
            .text-muted { color: #6c757d; }
            .border-top { border-top: 1px solid #dee2e6; }
            .border-bottom { border-bottom: 1px solid #dee2e6; }
            .py-3 { padding-top: 1rem; padding-bottom: 1rem; }
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 1rem; }
            .mb-4 { margin-bottom: 1.5rem; }
            .mt-4 { margin-top: 1.5rem; }
            .pt-3 { padding-top: 1rem; }
            .fs-5 { font-size: 1.25rem; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Transaction Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={receiptRef} className="p-4" style={{ background: "#fff" }}>
          {/* Receipt Header */}
          <div className="text-center mb-4">
            <h4 className="fw-bold">Payment Receipt</h4>
            <p className="text-muted mb-0">Transaction ID: {transaction._id}</p>
            <p className="text-muted">
              Date: {formatDate(transaction.createdAt)} at{" "}
              {formatTime(transaction.createdAt)}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="border-top border-bottom py-3 mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Description:</span>
              <span>
                {transaction.description ||
                  `Payment for ${transaction.planId?.name || "Plan"}`}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Status:</span>
              <span className="text-capitalize">{transaction.status}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">Payment Method:</span>
              <span className="text-capitalize">
                {transaction.paymentMethod || "N/A"}
              </span>
            </div>
          </div>

          {/* Plan Details */}
          {transaction.planId && (
            <div className="mb-3">
              <h6 className="fw-bold mb-2">Plan Details</h6>
              <div className="d-flex justify-content-between mb-1">
                <span>Plan Name:</span>
                <span>{transaction.planId.name}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>Duration:</span>
                <span>{transaction.planId.duration}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span>Amount:</span>
                <span>{formatAmount(transaction.amount)}</span>
              </div>
            </div>
          )}

          {/* Add-ons */}
          {transaction.addOns && transaction.addOns.length > 0 && (
            <div className="mb-3">
              <h6 className="fw-bold mb-2">Add-Ons</h6>
              {transaction.addOns.map((addOn, idx) => (
                <div key={idx} className="d-flex justify-content-between mb-1">
                  <span>Upgrade to {addOn.addOnMaxUser} users:</span>
                  <span>+{formatAmount(addOn.addOnAmount)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Total */}
          <div className="border-top pt-3">
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total Amount:</span>
              <span>
                {formatAmount(
                  transaction.amount +
                    (transaction.addOns?.reduce(
                      (sum, addOn) => sum + addOn.addOnAmount,
                      0
                    ) || 0)
                )}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted small mb-0">Thank you for your payment!</p>
            <p className="text-muted small">
              For any queries, please contact support.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <FaTimes className="me-1" /> Close
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          <FaPrint className="me-1" /> Print Receipt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
