import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";

const PhotoVerification = () => {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState([
    { id: 1, minUsers: 1, maxUsers: 10, price: 100 },
    { id: 2, minUsers: 11, maxUsers: 50, price: 200 },
    { id: 3, minUsers: 51, maxUsers: 100, price: 300 }
  ]);
  const [planData, setPlanData] = useState({ id: null, minUsers: "", maxUsers: "", price: "" });

  const handleShow = () => {
    setPlanData({ id: null, minUsers: "", maxUsers: "", price: "" });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (planData.id) {
        const updatedPlans = plans.map(plan => 
          plan.id === planData.id ? { ...plan, ...planData } : plan
        );
        setPlans(updatedPlans);
      } else {
        const newPlan = { ...planData, id: plans.length + 1 };
        setPlans([...plans, newPlan]);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  const handleEdit = (plan) => {
    setPlanData(plan);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div>
      <Navbar pageTitle="Manage Plans" />
      <main className="container my-4">
        <section className="mb-5" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <Button variant="primary" onClick={handleShow}>
            Add Plan
          </Button>
        </section>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Minimum Users</th>
              <th>Maximum Users</th>
              <th>Price ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.minUsers}</td>
                <td>{plan.maxUsers}</td>
                <td>{plan.price}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(plan)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(plan.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{planData.id ? "Edit Plan" : "Add Plan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Minimum Users</Form.Label>
              <Form.Control type="number" name="minUsers" value={planData.minUsers} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Maximum Users</Form.Label>
              <Form.Control type="number" name="maxUsers" value={planData.maxUsers} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price ($)</Form.Label>
              <Form.Control type="number" name="price" value={planData.price} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhotoVerification;