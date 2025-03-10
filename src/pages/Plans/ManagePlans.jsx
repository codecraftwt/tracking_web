import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal, Button, Form, Table, Row, Col, Card } from "react-bootstrap";

const ManagePlans = () => {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState([
    { id: 1, minUsers: 1, maxUsers: 10, price: 100 },
    { id: 2, minUsers: 11, maxUsers: 50, price: 200 },
    { id: 3, minUsers: 51, maxUsers: 100, price: 300 },
  ]);
  const [planData, setPlanData] = useState({
    id: null,
    minUsers: "",
    maxUsers: "",
    price: "",
  });

  const handleShow = () => {
    setPlanData({ id: null, minUsers: "", maxUsers: "", price: "" });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
  };

  const handleSubmit = () => {
    if (planData.id) {
      setPlans(
        plans.map((plan) =>
          plan.id === planData.id ? { ...plan, ...planData } : plan
        )
      );
    } else {
      setPlans([...plans, { ...planData, id: plans.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (plan) => {
    setPlanData(plan);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar pageTitle="Manage Plans" />
      <main className="container my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold">Subscription Plans</h4>
              <Button variant="success" onClick={handleShow}>
                <FaPlus className="me-2" /> Add Plan
              </Button>
            </div>

            <Table striped bordered hover>
              <thead className="bg-primary text-white">
                <tr>
                  <th>Minimum Users</th>
                  <th>Maximum Users</th>
                  <th>Price ($)</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.minUsers}</td>
                    <td>{plan.maxUsers}</td>
                    <td>${plan.price}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(plan)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </main>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{planData.id ? "Edit Plan" : "Add Plan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Minimum Users</Form.Label>
              <Form.Control
                type="number"
                name="minUsers"
                value={planData.minUsers}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Maximum Users</Form.Label>
              <Form.Control
                type="number"
                name="maxUsers"
                value={planData.maxUsers}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={planData.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Plan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagePlans;
