import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Modal, Button, Form, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlan,
  deletePlan,
  getAllPlans,
  updatePlan,
} from "../../redux/slices/planSlice";
import Loader from "../../components/Loader";
import CustomButton from "../../components/CustomButton";

const ManagePlans = () => {
  const dispatch = useDispatch();
  const { plansList, loading, error } = useSelector((state) => state.PlanData);

  const [showModal, setShowModal] = useState(false);
  const [planData, setPlanData] = useState({
    id: null,
    name: "",
    description: "",
    minUsers: "",
    maxUsers: "",
    price: "",
    duration: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState(null);

  const durationOptions = [
    "monthly",
    "3 months",
    "6 months",
    "9 months",
    "1 year",
  ];
  const planOptions = [
    "Standard Plan",
    "Premium Plan",
    "Enterprise Plan",
    "Custom Plan",
  ];

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleShow = () => {
    setPlanData({
      id: null,
      name: "",
      description: "",
      minUsers: "",
      maxUsers: "",
      price: "",
      duration: "",
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Changing", name, value);
    setPlanData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('plan data submitted", planDa', planData);
    if (planData._id) {
      dispatch(updatePlan({ planId: planData._id, updatedPlan: planData }));
    } else {
      dispatch(createPlan(planData));
    }
    handleClose();
  };

  const handleEdit = (plan) => {
    setPlanData({
      _id: plan._id,
      name: plan.name,
      description: plan.description,
      minUsers: plan.minUsers,
      maxUsers: plan.maxUsers,
      price: plan.price,
      duration: plan.duration || "monthly",
    });
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeletePlanId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletePlanId) {
      dispatch(deletePlan(deletePlanId));
    }
    setShowDeleteModal(false);
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar pageTitle="Manage Plans" />
      <main className="container my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5>Subscription Plans</h5>             
              <CustomButton
                handleClick={handleShow}
                text="Add Plan"
                icon={FaPlus}
              />
            </div>

            {loading ? (
              <Loader text="Getting users" />
            ) : (
              <Table striped bordered hover className="tableStyle">
                <thead className="bg-primary text-white">
                  <tr className="tdThStyle">
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
                      <td>{plan.name}</td>
                      <td>{plan.description}</td>
                      <td>{plan.minUsers}</td>
                      <td>{plan.maxUsers}</td>
                      <td>{plan.price}</td>
                      <td>{plan.duration}</td>
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
                          onClick={() => confirmDelete(plan._id)}
                        >
                          <FaTrash />
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
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this plan?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{planData._id ? "Edit Plan" : "Add Plan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Plan Type</Form.Label>
              <Form.Select
                name="name"
                value={planData.name}
                onChange={handleChange}
              >
                {planOptions?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={planData.description}
                onChange={handleChange}
              />
            </Form.Group>
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
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={planData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Select
                name="duration"
                value={planData.duration}
                onChange={handleChange}
              >
                {durationOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
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
