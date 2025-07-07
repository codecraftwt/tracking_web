import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaCreditCard, FaUsers, FaClock, FaCalculator } from "react-icons/fa";
import { Button, Card, Badge, Alert, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../redux/slices/planSlice";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  clearPaymentState,
  clearOrderData,
} from "../../redux/slices/paymentSlice";
import Loader from "../../components/Loader";
import { RAZORPAY_KEY_ID } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";

const PaymentPlans = () => {
  const dispatch = useDispatch();
  const { plansList, loading, error } = useSelector((state) => state.PlanData);
  const {
    orderLoading,
    orderError,
    orderData,
    testError,
    testData,
    paymentStatus,
  } = useSelector((state) => state.PaymentData);

  const { isAuthenticated, user } = useAuth();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [showCalculator, setShowCalculator] = useState(true);
  const [userInput, setUserInput] = useState({
    userCount: 1,
    avgTrackingHours: 1,
  });
  const [calculatedPlans, setCalculatedPlans] = useState([]);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const calculateRequiredPlans = () => {
    if (!plansList || plansList.length === 0) return;

    const totalHoursNeeded = userInput.userCount * userInput.avgTrackingHours;

    // Create calculated plans based on total hours needed
    const generatedPlans = plansList.map((plan) => {
      // Calculate how many months this plan would cover based on included hours
      const hoursPerMonth = plan.includedHours || 100; // Default to 100 if not specified
      const monthsCovered =
        hoursPerMonth > 0 ? Math.ceil(totalHoursNeeded / hoursPerMonth) : 1;

      // Calculate total price for the coverage period
      const totalPrice = plan.price * monthsCovered;

      return {
        ...plan,
        monthsCovered,
        totalPrice,
        totalHoursCovered: hoursPerMonth * monthsCovered,
        hoursPerMonth,
      };
    });

    setCalculatedPlans(generatedPlans);
    setShowCalculator(false);
  };

  const resetCalculator = () => {
    setShowCalculator(true);
    setCalculatedPlans([]);
  };

  const handlePhonePePayment = async (planId) => {
    // ... (keep your existing payment handler logic)
  };

  const getPlanColor = (planName) => {
    if (planName.includes("Enterprise")) return "#8B5CF6";
    if (planName.includes("Premium")) return "#10B981";
    if (planName.includes("Standard")) return "#F59E0B";
    return "#3B82F6";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: Math.max(1, parseInt(value) || 1),
    }));
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Payment Plans" />
      <main className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            {/* Payment Status Alerts */}
            {paymentSuccess && (
              <Alert
                variant="success"
                dismissible
                onClose={() => setPaymentSuccess(null)}
                className="mb-4"
              >
                <Alert.Heading>Payment Successful!</Alert.Heading>
                <p>{paymentSuccess}</p>
              </Alert>
            )}

            {/* Calculator Section */}
            {showCalculator ? (
              <Card
                className="border-0 shadow-sm mb-4"
                style={{ borderRadius: "12px" }}
              >
                <Card.Header className="d-flex align-items-center bg-white border-0">
                  <FaCalculator className="me-2" style={{ color: "#3B82F6" }} />
                  <h5 className="fw-bold mb-0">Calculate Your Needs</h5>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="userCount">
                          <Form.Label className="d-flex align-items-center">
                            <FaUsers className="me-2" />
                            Number of Users
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            name="userCount"
                            value={userInput.userCount}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="avgTrackingHours">
                          <Form.Label className="d-flex align-items-center">
                            <FaClock className="me-2" />
                            Avg. Tracking Hours Per User
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            name="avgTrackingHours"
                            value={userInput.avgTrackingHours}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6>Total Tracking Hours Needed:</h6>
                        <h3 className="text-primary">
                          {userInput.userCount * userInput.avgTrackingHours}{" "}
                          hours
                        </h3>
                      </div>
                      <Button
                        variant="primary"
                        onClick={calculateRequiredPlans}
                        disabled={loading}
                      >
                        {loading ? "Calculating..." : "Find Suitable Plans"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5>Recommended Plans for Your Needs</h5>
                  <p className="text-muted mb-0">
                    Based on {userInput.userCount} users tracking{" "}
                    {userInput.avgTrackingHours} hours each (
                    {userInput.userCount * userInput.avgTrackingHours} total
                    hours)
                  </p>
                </div>
                <Button variant="outline-secondary" onClick={resetCalculator}>
                  Recalculate
                </Button>
              </div>
            )}

            {/* Plans Display */}
            {loading ? (
              <Card className="border-0 shadow-sm text-center py-5">
                <Card.Body>
                  <Loader text="Loading plans..." />
                </Card.Body>
              </Card>
            ) : (
              <div className="row g-4">
                {(showCalculator ? plansList : calculatedPlans)?.map(
                  (plan, index) => (
                    <div key={plan._id} className="col-lg-6 col-xl-4">
                      <Card className="border-0 shadow-sm h-100">
                        <Card.Header
                          className="border-0 py-3"
                          style={{
                            background: `linear-gradient(135deg, ${getPlanColor(
                              plan.name
                            )}, ${getPlanColor(plan.name)}dd)`,
                            borderRadius: "12px 12px 0 0",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <div>
                                <h6 className="mb-0 fw-bold text-white">
                                  {plan.name}
                                </h6>
                                {!showCalculator && (
                                  <small className="text-white opacity-75">
                                    Covers {plan.monthsCovered} month
                                    {plan.monthsCovered > 1 ? "s" : ""}
                                  </small>
                                )}
                              </div>
                            </div>
                            <Badge bg="light" className="text-dark px-2 py-1">
                              {plan.duration}
                            </Badge>
                          </div>
                        </Card.Header>

                        <Card.Body className="p-4">
                          {/* Description */}

                          {/* Price */}
                          <div className="text-center mb-4">
                            <div
                              className="d-flex align-items-center justify-content-center mb-2"
                              style={{
                                transition: "all 0.3s ease",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                              }}
                            >
                              <h3
                                className="fw-bold mb-0"
                                style={{ color: getPlanColor(plan.name) }}
                              >
                                ₹{showCalculator ? plan.price : plan.totalPrice}
                              </h3>
                              <small className="text-muted">
                                {showCalculator
                                  ? `per ${plan.duration}`
                                  : `total for ${plan.monthsCovered} month${
                                      plan.monthsCovered > 1 ? "s" : ""
                                    }`}
                              </small>
                            </div>

                            {!showCalculator && (
                              <div className="mb-3 p-3 bg-light rounded">
                                <div className="d-flex justify-content-between mb-2">
                                  <span>Hours per month:</span>
                                  <strong>{plan.hoursPerMonth}</strong>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                  <span>Total hours covered:</span>
                                  <strong>{plan.totalHoursCovered}</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span>Your required hours:</span>
                                  <strong>
                                    {userInput.userCount *
                                      userInput.avgTrackingHours}
                                  </strong>
                                </div>
                              </div>
                            )}

                            <div className="mb-4">
                              <div className="row g-3">
                                <div className="col-6">
                                  <div className="d-flex align-items-center">
                                    <FaUsers
                                      className="me-2"
                                      style={{ color: "#3B82F6" }}
                                    />
                                    <div>
                                      <small className="text-muted d-block">
                                        Min Users
                                      </small>
                                      <span
                                        className="fw-semibold"
                                        style={{ color: "#374151" }}
                                      >
                                        {plan.minUsers}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="d-flex align-items-center">
                                    <FaUsers
                                      className="me-2"
                                      style={{ color: "#3B82F6" }}
                                    />
                                    <div>
                                      <small className="text-muted d-block">
                                        Max Users
                                      </small>
                                      <span
                                        className="fw-semibold"
                                        style={{ color: "#374151" }}
                                      >
                                        {plan.maxUsers}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="d-grid">
                              <Button
                                variant="primary"
                                className="d-flex align-items-center justify-content-center"
                                onClick={() => handlePhonePePayment(plan._id)}
                                disabled={orderLoading}
                                style={{
                                  background: getPlanColor(plan.name),
                                  border: "none",
                                }}
                              >
                                {orderLoading ? (
                                  <>
                                    <div className="spinner-border spinner-border-sm me-2" />
                                    Processing...
                                  </>
                                ) : (
                                  <>
                                    <FaCreditCard className="me-2" />
                                    Subscribe Now
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Empty State */}
            {!loading && (!plansList || plansList.length === 0) && (
              <Card className="border-0 shadow-sm text-center py-5">
                <Card.Body>
                  <FaCreditCard size={48} className="text-muted mb-3" />
                  <h6 className="text-muted">No plans available</h6>
                  <p className="text-muted small">
                    No subscription plans are currently available.
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

export default PaymentPlans;
