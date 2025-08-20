import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import {
  FaCreditCard,
  FaUsers,
  FaPlusCircle,
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";
import { Button, Card, Badge, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../redux/slices/planSlice";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  clearPaymentState,
  clearOrderData,
  createAddOnOrder,
  verifyAddOnPayment,
} from "../../redux/slices/paymentSlice";
import Loader from "../../components/Loader";
import { RAZORPAY_KEY_ID } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../redux/slices/userSlice";
import moment from "moment";

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
  const userData = useSelector((state) => state.UserData.userInfo);

  const { isAuthenticated, user } = useAuth();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
  const [currentPlanDetails, setCurrentPlanDetails] = useState(null);

  const [processingPlanId, setProcessingPlanId] = useState(null);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserById(userData._id));
  }, [dispatch, userData._id]);

  // Check if user has active subscription and set current plan details
  useEffect(() => {
    if (userData?.currentPaymentId) {
      const isExpired = moment(userData.currentPaymentId.expiresAt).isBefore(
        moment()
      );
      setHasActiveSubscription(!isExpired); // Only set to true if not expired
      if (userData.currentPaymentId.expiresAt) {
        setSubscriptionExpiry(userData.currentPaymentId.expiresAt);
      }
      // Set current plan details from the payment record
      setCurrentPlanDetails({
        _id: userData.currentPaymentId._id,
        planId: userData.currentPaymentId.planId,
        maxUser: userData.currentPaymentId.maxUser,
        minUser: userData.currentPaymentId.minUser,
        description: userData.currentPaymentId.description,
      });
    } else {
      setHasActiveSubscription(false);
      setSubscriptionExpiry(null);
      setCurrentPlanDetails(null);
    }
  }, [userData]);

  // Separate plans into subscriptions and add-ons
  const subscriptionPlans =
    plansList?.filter(
      (plan) => !plan.name.includes("Add on Plan") && plan.status === "active"
    ) || [];

  const addOnPlans =
    plansList?.filter(
      (plan) => plan.name.includes("Add on Plan") && plan.status === "active"
    ) || [];

  const handleSubscriptionPayment = async (planId) => {
    setProcessingPlanId(planId);
    // Check if user has an active (non-expired) subscription
    if (
      hasActiveSubscription &&
      subscriptionExpiry &&
      moment(subscriptionExpiry).isAfter(moment())
    ) {
      alert(
        "You already have an active subscription. You can only purchase add-on plans."
      );
      return;
    }

    console.log("Payment button clicked for planId:", planId);

    try {
      dispatch(clearPaymentState());
      setPaymentSuccess(null);

      if (!isAuthenticated || !user) {
        console.log("User not authenticated");
        alert("User not authenticated. Please login again.");
        return;
      }

      const adminId = user._id || user.id || user.userId;
      console.log("Authenticated user:", user);
      console.log("Admin ID from user data:", adminId);

      if (!adminId) {
        console.log("No admin ID found in user data");
        alert("User ID not found. Please login again.");
        return;
      }

      if (!window.Razorpay) {
        console.log("Razorpay not loaded");
        alert(
          "Payment gateway not loaded. Please refresh the page and try again."
        );
        return;
      }

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
              await dispatch(getPaymentHistory({ adminId }));
            } else {
              console.error("Payment verification failed:", verifyResult.error);
              // alert("Payment verification failed. Please contact support.");
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
    } finally {
      setProcessingPlanId(null);
    }
  };

  const handleUpgradePlan = async (addOnPlanId) => {
    setProcessingPlanId(addOnPlanId);
    try {
      if (!user) {
        alert("User not authenticated. Please login.");
        return;
      }

      // Check if user has an active subscription
      if (!hasActiveSubscription || !currentPlanDetails) {
        alert("You need an active subscription to purchase add-on plans.");
        return;
      }

      const adminId = user._id || user.id || user.userId;
      const paymentId = currentPlanDetails._id;

      // Clear previous state
      dispatch(clearPaymentState());
      setPaymentSuccess(null);

      // Step 1: Create AddOn Order
      const orderResult = await dispatch(
        createAddOnOrder({ adminId, addOnPlanId, paymentId })
      );

      if (createAddOnOrder.rejected.match(orderResult)) {
        console.error("Order creation failed:", orderResult.error);
        alert("Failed to create order");
        return;
      }

      const orderData = orderResult.payload.data;
      console.log("Add-on order created successfully:", orderData);

      // Step 2: Handle Razorpay Payment
      const razorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Walstart Tracking App",
        description: `Payment for AddOn Plan ${currentPlanDetails.description}`,
        handler: async (response) => {
          console.log("Razorpay Response:", response);

          // Step 3: Verify Payment
          const verifyResult = await dispatch(
            verifyAddOnPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentId: orderData.paymentId,
            })
          );

          if (verifyAddOnPayment.fulfilled.match(verifyResult)) {
            setPaymentSuccess(
              "Payment successful! Your plan has been upgraded."
            );
            dispatch(clearOrderData());
            dispatch(getUserById(adminId));
            await dispatch(getPaymentHistory({ adminId }));
          } else {
            console.error("Payment verification failed:", verifyResult.error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.phone || "",
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

      // Initialize Razorpay
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in upgrading plan:", error);
      alert("An error occurred while upgrading your plan.");
    } finally {
      setProcessingPlanId(null);
    }
  };

  // Update the renderPlanCard function to disable subscription plans when there's an active subscription
  const renderPlanCard = (plan, index, isAddOn = false) => (
    <div key={plan._id} className="col-lg-6 col-xl-4">
      <div
        style={{
          position: "relative",
        }}
      >
        {plan.name === "Enterprise Plan" && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              zIndex: 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            Recommended
          </div>
        )}

        <Card
          className={`border-0 shadow-sm h-100 ${
            !isAddOn &&
            hasActiveSubscription &&
            currentPlanDetails?.planId !== plan._id
              ? "opacity-75"
              : ""
          }`}
          style={{
            borderRadius: "12px",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            if (
              !(
                !isAddOn &&
                hasActiveSubscription &&
                currentPlanDetails?.planId !== plan._id
              )
            ) {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
          }}
        >
          <Card.Header
            className="border-0 py-3"
            style={{
              background: "#0d6efd",
              borderRadius: "12px 12px 0 0",
              transition: "all 0.3s ease",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="mb-0 fw-bold text-white">{plan.name}</h6>
                  <small className="text-white opacity-75">
                    {isAddOn ? "Add-on" : `Plan #${index + 1}`}
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
            <p className="text-muted small mb-4">{plan.description}</p>

            <div className="text-center mb-4">
              <div
                className="d-flex align-items-center justify-content-center mb-2"
                style={{
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  if (
                    !(
                      !isAddOn &&
                      hasActiveSubscription &&
                      currentPlanDetails?.planId !== plan._id
                    )
                  ) {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <h3 className="fw-bold mb-0" style={{ color: "#0d6efd" }}>
                  {plan.price}
                </h3>
              </div>
              <small className="text-muted">per {plan.duration}</small>
            </div>

            <div className="mb-4">
              <div className="row g-3">
                <div className="col-6">
                  <div
                    className="d-flex align-items-center"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      if (
                        !(
                          !isAddOn &&
                          hasActiveSubscription &&
                          currentPlanDetails?.planId !== plan._id
                        )
                      ) {
                        e.currentTarget.style.transform = "translateX(5px)";
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <FaUsers className="me-2" style={{ color: "#3B82F6" }} />
                    <div>
                      <small className="text-muted d-block">Min Users</small>
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
                      if (
                        !(
                          !isAddOn &&
                          hasActiveSubscription &&
                          currentPlanDetails?.planId !== plan._id
                        )
                      ) {
                        e.currentTarget.style.transform = "translateX(5px)";
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <FaUsers className="me-2" style={{ color: "#3B82F6" }} />
                    <div>
                      <small className="text-muted d-block">Max Users</small>
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
              {!isAddOn && hasActiveSubscription ? (
                currentPlanDetails?.planId === plan._id ? (
                  <Button
                    variant={
                      subscriptionExpiry &&
                      moment(subscriptionExpiry).isBefore(moment())
                        ? "warning"
                        : "primary"
                    }
                    className="d-flex align-items-center justify-content-center"
                    disabled={
                      subscriptionExpiry &&
                      moment(subscriptionExpiry).isAfter(moment())
                    }
                    style={{
                      borderRadius: "8px",
                      padding: "12px",
                    }}
                  >
                    {subscriptionExpiry &&
                    moment(subscriptionExpiry).isBefore(moment()) ? (
                      <>
                        <FaCheckCircle className="me-2" />
                        Expired - Renew Now
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="me-2" />
                        Active Plan
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="d-flex align-items-center justify-content-center"
                    disabled
                    style={{
                      borderRadius: "8px",
                      padding: "12px",
                      cursor: "not-allowed",
                    }}
                  >
                    <FaCreditCard className="me-2" />
                    Subscribe Now
                  </Button>
                )
              ) : (
                <Button
                  variant="primary"
                  className="d-flex align-items-center justify-content-center"
                  onClick={() => {
                    isAddOn
                      ? handleUpgradePlan(plan._id)
                      : handleSubscriptionPayment(plan._id);
                  }}
                  disabled={
                    orderLoading ||
                    (!isAddOn &&
                      hasActiveSubscription &&
                      currentPlanDetails?.planId !== plan._id)
                  }
                  style={{
                    borderRadius: "8px",
                    background: "#0d6efd",
                    border: "none",
                    padding: "12px",
                    transition: "all 0.3s ease",
                    opacity:
                      orderLoading ||
                      (!isAddOn &&
                        hasActiveSubscription &&
                        currentPlanDetails?.planId !== plan._id)
                        ? 0.7
                        : 1,
                  }}
                  onMouseOver={(e) => {
                    if (
                      !orderLoading &&
                      !(
                        !isAddOn &&
                        hasActiveSubscription &&
                        currentPlanDetails?.planId !== plan._id
                      )
                    ) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                    }
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {processingPlanId === plan._id ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Processing...
                    </>
                  ) : (
                    <>
                      {isAddOn ? (
                        <FaArrowUp className="me-2" />
                      ) : (
                        <FaCreditCard className="me-2" />
                      )}
                      {isAddOn ? "Upgrade Now" : "Subscribe Now"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );

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
                <Alert.Heading className="h5">
                  Payment Successful!
                </Alert.Heading>
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

            {/* Active Subscription Notice */}
            {hasActiveSubscription ||
            (subscriptionExpiry &&
              moment(subscriptionExpiry).isBefore(moment())) ? (
              <Alert
                variant={
                  subscriptionExpiry &&
                  moment(subscriptionExpiry).isBefore(moment())
                    ? "warning"
                    : "info"
                }
                className="mb-4"
              >
                <Alert.Heading className="h5">
                  {subscriptionExpiry &&
                  moment(subscriptionExpiry).isBefore(moment())
                    ? "Subscription Expired"
                    : "Active Subscription"}
                </Alert.Heading>
                <p className="text-muted small">
                  {subscriptionExpiry &&
                  moment(subscriptionExpiry).isBefore(moment()) ? (
                    <>
                      Your subscription expired on{" "}
                      {moment(subscriptionExpiry).format("MMMM Do YYYY")}.
                      <br />
                      To continue using the service, please purchase one of the
                      subscription plans below.
                    </>
                  ) : (
                    <>
                      You currently have an active subscription plan.
                      {subscriptionExpiry && (
                        <>
                          {" "}
                          It will expire on{" "}
                          {moment(subscriptionExpiry).format("MMMM Do YYYY")}.
                        </>
                      )}
                      <br />
                      You can purchase add-on plans to increase your user limit.
                    </>
                  )}
                </p>
              </Alert>
            ) : null}

            {/* Subscription Plans Section */}
            <div className="mb-5">
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
                  {subscriptionPlans.length > 0 ? (
                    subscriptionPlans.map((plan, index) =>
                      renderPlanCard(plan, index, false)
                    )
                  ) : (
                    <div className="col-12">
                      <Card
                        className="border-0 shadow-sm text-center py-5"
                        style={{ borderRadius: "12px" }}
                      >
                        <Card.Body>
                          <FaCreditCard size={48} className="text-muted mb-3" />
                          <h6 className="text-muted">
                            No subscription plans available
                          </h6>
                          <p className="text-muted small">
                            No subscription plans are currently available.
                          </p>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Add-on Plans Section */}
            {addOnPlans.length > 0 && (
              <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="d-flex align-items-center mb-2 mb-sm-0">
                    <FaPlusCircle
                      className="me-2"
                      style={{ color: "#3B82F6" }}
                    />
                    <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                      Add-on Plans
                    </h5>
                  </div>
                </div>

                <div className="row g-4">
                  {addOnPlans.map((plan, index) =>
                    renderPlanCard(plan, index, true)
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPlans;
