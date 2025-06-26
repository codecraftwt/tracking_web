import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaCreditCard, FaUsers, FaCalendarAlt, FaDollarSign, FaShieldAlt, FaCrown, FaStar } from "react-icons/fa";
import { Modal, Button, Form, Table, Row, Col, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../redux/slices/planSlice";
import Loader from "../../components/Loader";
import axios from "axios";

const PaymentPlans = () => {
  const dispatch = useDispatch();
  const { plansList, loading, error } = useSelector((state) => state.PlanData);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handlePhonePePayment = async (planId) => {

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
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div className="d-flex align-items-center mb-2 mb-sm-0">
                <FaCreditCard className="me-2" style={{ color: "#3B82F6" }} />
                <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                  Subscription Plans
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
                {plansList?.length || 0} Plans Available
              </Badge>
            </div>

            {loading ? (
              <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: "12px" }}>
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
                        cursor: "pointer"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                      }}
                    >
                      <Card.Header 
                        className="border-0 py-3" 
                        style={{ 
                          background: `linear-gradient(135deg, ${getPlanColor(plan.name)}, ${getPlanColor(plan.name)}dd)`,
                          borderRadius: "12px 12px 0 0",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div>
                              <h6 className="mb-0 fw-bold text-white">{plan.name}</h6>
                              <small className="text-white opacity-75">Plan #{index + 1}</small>
                            </div>
                          </div>
                          <Badge 
                            bg="light" 
                            className="text-dark px-2 py-1"
                            style={{
                              transition: "all 0.3s ease"
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
                        <div className="mb-4">
                          {/* <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                            {plan.description || "Comprehensive plan with all features included"}
                          </p> */}
                        </div>

                        {/* Price */}
                        <div className="text-center mb-4">
                          <div 
                            className="d-flex align-items-center justify-content-center mb-2"
                            style={{
                              transition: "all 0.3s ease"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          >
                            {/* <FaDollarSign className="me-1" style={{ color: getPlanColor(plan.name) }} /> */}
                            <h3 className="fw-bold mb-0" style={{ color: getPlanColor(plan.name) }}>
                              {plan.price}
                            </h3>
                          </div>
                          <small className="text-muted">per {plan.duration}</small>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <div className="row g-3">
                            <div className="col-6">
                              <div 
                                className="d-flex align-items-center"
                                style={{
                                  transition: "all 0.3s ease"
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform = "translateX(5px)";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = "translateX(0)";
                                }}
                              >
                                <FaUsers className="me-2" style={{ color: "#3B82F6" }} />
                                <div>
                                  <small className="text-muted d-block">Min Users</small>
                                  <span className="fw-semibold" style={{ color: "#374151" }}>
                                    {plan.minUsers}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div 
                                className="d-flex align-items-center"
                                style={{
                                  transition: "all 0.3s ease"
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform = "translateX(5px)";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = "translateX(0)";
                                }}
                              >
                                <FaUsers className="me-2" style={{ color: "#3B82F6" }} />
                                <div>
                                  <small className="text-muted d-block">Max Users</small>
                                  <span className="fw-semibold" style={{ color: "#374151" }}>
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
                            onClick={() => handlePhonePePayment(plan._id)}
                            style={{ 
                              borderRadius: "8px",
                              background: getPlanColor(plan.name),
                              border: "none",
                              padding: "12px",
                              transition: "all 0.3s ease"
                            }}
                            onMouseOver={(e) => {
                              e.target.style.transform = "translateY(-2px)";
                              e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            <FaCreditCard className="me-2" />
                            Subscribe Now
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
              <Card className="border-0 shadow-sm text-center py-5" style={{ borderRadius: "12px" }}>
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
