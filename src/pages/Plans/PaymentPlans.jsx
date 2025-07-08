import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaCreditCard, FaUsers } from "react-icons/fa";
import { Button, Card, Badge, Alert } from "react-bootstrap";
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
import { getUserById } from "../../redux/slices/userSlice";

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

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  // Debug plans data
  useEffect(() => {
    console.log("Plans data:", plansList);
    if (plansList && plansList.length > 0) {
      console.log("First plan:", plansList[0]);
      console.log("First plan ID:", plansList[0]._id);
    }
  }, [plansList]);

  // Debug authentication
  useEffect(() => {
    console.log("Authentication status:", isAuthenticated);
    console.log("User data:", user);
    console.log("Token in localStorage:", localStorage.getItem("token"));
  }, [isAuthenticated, user]);

  // Test backend connectivity
  useEffect(() => {
    const testBackend = async () => {
      try {
        console.log("Testing backend connectivity...");
        // You can add a simple GET request here if needed
      } catch (error) {
        console.error("Backend connectivity test failed:", error);
      }
    };
    testBackend();
  }, []);

  const handlePhonePePayment = async (planId) => {
    console.log("Payment button clicked for planId:", planId);

    try {
      // Clear any previous payment state
      dispatch(clearPaymentState());
      setPaymentSuccess(null);

      // Check if user is authenticated
      if (!isAuthenticated || !user) {
        console.log("User not authenticated");
        alert("User not authenticated. Please login again.");
        return;
      }

      // Get user ID from authenticated user data
      const adminId = user._id || user.id || user.userId;
      console.log("Authenticated user:", user);
      console.log("Admin ID from user data:", adminId);

      if (!adminId) {
        console.log("No admin ID found in user data");
        alert("User ID not found. Please login again.");
        return;
      }

      // Validate Razorpay is loaded
      if (!window.Razorpay) {
        console.log("Razorpay not loaded");
        alert(
          "Payment gateway not loaded. Please refresh the page and try again."
        );
        return;
      }
      console.log("Razorpay is loaded");

      // Create order using Redux
      console.log("Creating order via Redux...");
      const orderResult = await dispatch(
        createPaymentOrder({ adminId, planId })
      );

      if (createPaymentOrder.rejected.match(orderResult)) {
        console.error("Order creation failed:", orderResult.error);
        alert(
          "Failed to create order: " +
            (orderResult.error?.message || "Unknown error")
        );
        return;
      }

      const orderData = orderResult.payload.data;
      console.log("Order created successfully:", orderData);

      // Initialize Razorpay payment
      console.log("Initializing Razorpay payment...");
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Walstart Tracking App",
        description: `Payment for ${orderData.receipt}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          console.log("Payment handler called with response:", response);
          try {
            // Verify payment using Redux
            const verifyResult = await dispatch(
              verifyPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                paymentId: orderData.paymentId,
              })
            );

            if (verifyPayment.fulfilled.match(verifyResult)) {
              setPaymentSuccess(
                "Payment successful! Your subscription has been activated."
              );
              dispatch(clearOrderData());
              dispatch(getUserById(adminId));
              await dispatch(getPaymentHistory(adminId));
            } else {
              console.error("Payment verification failed:", verifyResult.error);
              alert("Payment verification failed. Please contact support.");
            }
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name || user.userName || "",
          email: user.email || "",
          contact: user.phone || user.contact || "",
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay modal dismissed");
            dispatch(clearOrderData());
          },
        },
      };

      console.log("Razorpay options:", options);
      const rzp = new window.Razorpay(options);
      console.log("Opening Razorpay modal...");
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    }
  };

  const getPlanColor = (planName) => {
    if (planName.includes("Enterprise")) return "#8B5CF6";
    if (planName.includes("Premium")) return "#10B981";
    if (planName.includes("Standard")) return "#F59E0B";
    return "#3B82F6";
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

            {orderError && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => dispatch(clearPaymentState())}
                className="mb-4"
              >
                <Alert.Heading>Payment Error</Alert.Heading>
                <p>{orderError}</p>
              </Alert>
            )}

            {testError && (
              <Alert
                variant="warning"
                dismissible
                onClose={() => dispatch(clearPaymentState())}
                className="mb-4"
              >
                <Alert.Heading>API Test Error</Alert.Heading>
                <p>{testError}</p>
              </Alert>
            )}

            {testData && (
              <Alert
                variant="info"
                dismissible
                onClose={() => dispatch(clearPaymentState())}
                className="mb-4"
              >
                <Alert.Heading>API Test Successful</Alert.Heading>
                <p>Test data: {JSON.stringify(testData)}</p>
              </Alert>
            )}

            {paymentStatus !== "idle" && (
              <Alert
                variant={
                  paymentStatus === "success"
                    ? "success"
                    : paymentStatus === "failed"
                    ? "danger"
                    : "info"
                }
                className="mb-4"
              >
                <Alert.Heading>
                  Payment Status:{" "}
                  {paymentStatus.charAt(0).toUpperCase() +
                    paymentStatus.slice(1)}
                </Alert.Heading>
                <p>
                  {paymentStatus === "processing" && "Processing payment..."}
                  {paymentStatus === "success" &&
                    "Payment processed successfully!"}
                  {paymentStatus === "failed" &&
                    "Payment failed. Please try again."}
                </p>
              </Alert>
            )}

            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div className="d-flex align-items-center mb-2 mb-sm-0">
                <FaCreditCard className="me-2" style={{ color: "#3B82F6" }} />
                <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                  Subscription Plans
                </h5>
              </div>
            </div>

            {loading ? (
              <Card
                className="border-0 shadow-sm text-center py-5"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body>
                  <Loader text="Loading plans..." />
                </Card.Body>
              </Card>
            ) : (
              <div className="row g-4">
                {plansList?.map((plan, index) => (
                  <div key={plan._id} className="col-lg-6 col-xl-4">
                    <Card
                      className="border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                          "0 20px 40px rgba(0,0,0,0.1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 6px rgba(0,0,0,0.05)";
                      }}
                    >
                      <Card.Header
                        className="border-0 py-3"
                        style={{
                          background: `linear-gradient(135deg, ${getPlanColor(
                            plan.name
                          )}, ${getPlanColor(plan.name)}dd)`,
                          borderRadius: "12px 12px 0 0",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div>
                              <h6 className="mb-0 fw-bold text-white">
                                {plan.name}
                              </h6>
                              <small className="text-white opacity-75">
                                Plan #{index + 1}
                              </small>
                            </div>
                          </div>
                          <Badge
                            bg="light"
                            className="text-dark px-2 py-1"
                            style={{
                              transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = "scale(1.1)";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = "scale(1)";
                            }}
                          >
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
                            {/* <FaDollarSign className="me-1" style={{ color: getPlanColor(plan.name) }} /> */}
                            <h3
                              className="fw-bold mb-0"
                              style={{ color: getPlanColor(plan.name) }}
                            >
                              {plan.price}
                            </h3>
                          </div>
                          <small className="text-muted">
                            per {plan.duration}
                          </small>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <div className="row g-3">
                            <div className="col-6">
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateX(5px)";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateX(0)";
                                }}
                              >
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
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateX(5px)";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateX(0)";
                                }}
                              >
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

                        {/* Action Button */}
                        <div className="d-grid">
                          <Button
                            variant="primary"
                            className="d-flex align-items-center justify-content-center"
                            onClick={() => {
                              console.log("Button clicked directly");
                              handlePhonePePayment(plan._id);
                            }}
                            disabled={orderLoading}
                            style={{
                              borderRadius: "8px",
                              background: getPlanColor(plan.name),
                              border: "none",
                              padding: "12px",
                              transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                              if (!orderLoading) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow =
                                  "0 8px 25px rgba(0,0,0,0.2)";
                              }
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            {orderLoading ? (
                              <>
                                <div
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
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
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && (!plansList || plansList.length === 0) && (
              <Card
                className="border-0 shadow-sm text-center py-5"
                style={{ borderRadius: "12px" }}
              >
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
