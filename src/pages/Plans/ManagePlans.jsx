import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUsers,
  FaDollarSign,
  FaCalendarAlt,
  FaCrown,
  FaShieldAlt,
} from "react-icons/fa";
import {
  Modal,
  Button,
  Form,
  Table,
  Row,
  Col,
  Card,
  Badge,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlan,
  deletePlan,
  getAllPlans,
  updatePlan,
} from "../../redux/slices/planSlice";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import PlanModal from "../../components/modals/PlanModal";

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
    status: "active",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    "Add on Plan",
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
      status: "",
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (planData._id) {
      dispatch(updatePlan({ planId: planData._id, updatedPlan: planData }))
        .unwrap()
        .then(() => {
          toast.success("Plan updated successfully!");
          handleClose();
        })
        .catch(() => {
          toast.error("Failed to update plan");
        });
    } else {
      dispatch(createPlan(planData))
        .unwrap()
        .then(() => {
          toast.success("Plan created successfully!");
          handleClose();
        })
        .catch((error) => {
          const errMsg = error?.message || "Failed to create plan";
          toast.error(errMsg);
        });
    }
  };

  console.log("plansList", plansList);

  const handleEdit = (plan) => {
    setPlanData({
      _id: plan._id,
      name: plan.name,
      description: plan.description,
      minUsers: plan.minUsers,
      maxUsers: plan.maxUsers,
      price: plan.price,
      duration: plan.duration || "monthly",
      status: plan.status || "active",
    });
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeletePlanId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletePlanId) {
      dispatch(deletePlan(deletePlanId))
        .unwrap()
        .then(() => {
          toast.success("Plan deleted successfully!");
          setShowDeleteModal(false);
        })
        .catch(() => {
          toast.error("Failed to delete plan");
        });
    }
  };

  // Filter plans based on search
  const filteredPlans =
    plansList?.filter(
      (plan) =>
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getPlanIcon = (planName) => {
    if (planName.includes("Enterprise")) return <FaCrown />;
    if (planName.includes("Premium")) return <FaShieldAlt />;
    return <FaUsers />;
  };

  const getPlanColor = (planName) => {
    if (planName.includes("Enterprise")) return "primary";
    if (planName.includes("Premium")) return "success";
    if (planName.includes("Standard")) return "warning";
    return "secondary";
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Manage Plans" />

      <motion.main
        className="container-fluid py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Header Section */}

            {/* Search Section */}
            <motion.div variants={itemVariants} className="mb-4">
              <Card
                className="border-0 shadow-sm"
                style={{ borderRadius: "16px" }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                    <InputGroup style={{ flex: 1, minWidth: "250px" }}>
                      <InputGroup.Text
                        className="border-0"
                        style={{
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "#3B82F6",
                          borderTopLeftRadius: "12px",
                          borderBottomLeftRadius: "12px",
                        }}
                      >
                        <FaUsers size={16} />
                      </InputGroup.Text>
                      <FormControl
                        placeholder="Search plans by name or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0"
                        style={{
                          background: "rgba(59, 130, 246, 0.05)",
                          borderTopRightRadius: "12px",
                          borderBottomRightRadius: "12px",
                        }}
                      />
                    </InputGroup>

                    <Button
                      variant="primary"
                      className="px-4 py-2 fw-semibold rounded-3 mt-2 mt-sm-0"
                      onClick={handleShow}
                      style={{
                        background: "#3B82F6",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <FaPlus className="me-2" size={16} />
                      Add Plan
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Plans Table */}
            <motion.div variants={itemVariants}>
              <Card
                className="border-0 shadow-sm"
                style={{ borderRadius: "16px" }}
              >
                <Card.Header
                  className="border-0 p-4"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="text-white fw-bold mb-1">
                        Plans Overview
                      </h5>
                      <p className="text-white-50 mb-0 small">
                        Complete list of all subscription plans
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Badge
                        bg="light"
                        className="text-primary px-3 py-2 rounded-pill"
                        style={{ fontSize: "14px" }}
                      >
                        <FaUsers className="me-2" />
                        {filteredPlans.length} Results
                      </Badge>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  {loading ? (
                    <div className="p-5">
                      <Loader text="Loading plans" />
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table className="mb-0 small">
                        <thead>
                          <tr
                            style={{ background: "rgba(59, 130, 246, 0.05)" }}
                          >
                            <th
                              className="border-0 p-3 fw-semibold"
                              style={{ color: "#374151" }}
                            >
                              Plan Details
                            </th>
                            <th
                              className="border-0 p-3 fw-semibold"
                              style={{ color: "#374151" }}
                            >
                              Users
                            </th>
                            <th
                              className="border-0 p-3 fw-semibold"
                              style={{ color: "#374151" }}
                            >
                              Description
                            </th>
                            <th
                              className="border-0 p-3 fw-semibold"
                              style={{ color: "#374151" }}
                            >
                              Price
                            </th>
                            <th
                              className="border-0 p-3 fw-semibold"
                              style={{ color: "#374151" }}
                            >
                              Duration
                            </th>
                            <th
                              className="border-0 p-3 fw-semibold"
                              style={{ color: "#374151" }}
                            >
                              Status
                            </th>
                            <th
                              className="border-0 p-3 fw-semibold text-center"
                              style={{ color: "#374151" }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPlans.map((plan, index) => {
                            const rowBg = index % 2 === 0 ? "#f1f3f4" : "#fff";
                            return (
                              <motion.tr
                                key={plan._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  Array.from(e.currentTarget.children).forEach(
                                    (td) => {
                                      td.style.background =
                                        "rgba(59, 130, 246, 0.1)";
                                    }
                                  );
                                }}
                                onMouseLeave={(e) => {
                                  Array.from(e.currentTarget.children).forEach(
                                    (td) => {
                                      td.style.background = rowBg;
                                    }
                                  );
                                }}
                              >
                                <td
                                  className="border-0 p-2"
                                  style={{ background: rowBg }}
                                >
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div
                                        className="fw-semibold"
                                        style={{ color: "#1f2937" }}
                                      >
                                        {plan.name}
                                      </div>
                                      {/* <div
                                        className="text-muted small"
                                        style={{ maxWidth: "200px" }}
                                      >
                                        {plan.description}
                                      </div> */}
                                    </div>
                                  </div>
                                </td>
                                <td
                                  className="border-0 p-3"
                                  style={{ background: rowBg }}
                                >
                                  <div className="d-flex align-items-center">
                                    <span className="text-muted">
                                      {plan.minUsers} - {plan.maxUsers}
                                    </span>
                                  </div>
                                </td>
                                <td
                                  className="border-0 p-3"
                                  style={{ background: rowBg }}
                                >
                                  <span
                                    className="text-muted"
                                    style={{
                                      maxWidth: "200px",
                                      display: "block",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {plan.description}
                                  </span>
                                </td>
                                <td
                                  className="border-0 p-3"
                                  style={{ background: rowBg }}
                                >
                                  <div className="d-flex align-items-center">
                                    <span className="fw-bold text-success">
                                      {plan.price}
                                    </span>
                                  </div>
                                </td>
                                <td
                                  className="border-0 p-3"
                                  style={{ background: rowBg }}
                                >
                                  <div className="d-flex align-items-center">
                                    <Badge
                                      bg="light"
                                      className="text-dark rounded-pill px-3 py-1"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {plan.duration}
                                    </Badge>
                                  </div>
                                </td>
                                <td
                                  className="border-0 p-3"
                                  style={{ background: rowBg }}
                                >
                                  <Badge
                                    bg={
                                      plan.status === "active"
                                        ? "success"
                                        : "secondary"
                                    }
                                    className="text-white px-3 py-1 rounded-pill"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {plan.status}
                                  </Badge>
                                </td>
                                <td
                                  className="border-0 p-3 text-center"
                                  style={{ background: rowBg }}
                                >
                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="btn btn-outline-primary btn-sm rounded-3"
                                      onClick={() => handleEdit(plan)}
                                    >
                                      <FaEdit size={12} />
                                    </motion.button>

                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="btn btn-outline-danger btn-sm rounded-3"
                                      onClick={() => confirmDelete(plan._id)}
                                    >
                                      <FaTrash size={12} />
                                    </motion.button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </Table>

                      {filteredPlans.length === 0 && (
                        <div className="text-center py-5">
                          <div className="mb-3">
                            <FaUsers size={48} className="text-muted" />
                          </div>
                          <h6 className="text-muted">No plans found</h6>
                          <p className="text-muted small">
                            {searchQuery
                              ? "Try adjusting your search criteria"
                              : "No plans available"}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Plan"
        message="Delete this plan?"
        subMessage="This action cannot be undone. The plan will be permanently removed."
      />

      {/* Add/Edit Plan Modal */}
      <PlanModal
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        planData={planData}
        handleChange={handleChange}
        planOptions={planOptions}
        durationOptions={durationOptions}
      />
    </div>
  );
};

export default ManagePlans;
