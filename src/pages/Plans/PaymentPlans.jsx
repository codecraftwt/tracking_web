import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaCreditCard } from "react-icons/fa";
import { Modal, Button, Form, Table, Row, Col } from "react-bootstrap";
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
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar pageTitle="Payment Plans" />
      <main className="container my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5>Subscription Plans</h5>
            </div>

            {loading ? (
              <Loader text="Getting plans..." />
            ) : (
              <Table striped bordered hover className="tableStyle">
                <thead className="bg-primary text-white">
                  <tr className="tdThStyle">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Minimum Users</th>
                    <th>Maximum Users</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="tdThStyle">
                  {plansList?.map((plan) => (
                    <tr key={plan._id}>
                      <td>{plansList.indexOf(plan) + 1}</td>
                      <td>{plan.name}</td>
                      <td>{plan.description}</td>
                      <td>{plan.minUsers}</td>
                      <td>{plan.maxUsers}</td>
                      <td>{plan.price}</td>
                      <td>{plan.duration}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handlePhonePePayment(plan._id)}
                        >
                          <FaCreditCard />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default PaymentPlans;
