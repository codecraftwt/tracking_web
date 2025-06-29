import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Modal,
  Badge
} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { BiSearch, BiUserPlus, BiPencil, BiTrash } from "react-icons/bi";
import { FaUser, FaUsers, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAllAdmins,
  getAllUsers,
  deleteUser,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const User = () => {
  const [key, setKey] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("user"));
  const role_id = userData?.role_id;

  useEffect(() => {
    if (role_id === 1) {
      dispatch(getAllUsers(userData?._id));
    } else if (role_id === 2) {
      dispatch(getAllAdmins());
    }
  }, [dispatch, role_id]);

  const users =
    useSelector((state) =>
      role_id === 1 ? state.UserData.usersList : state.UserData.adminList
    ) || [];

  const loading = useSelector((state) =>
    role_id === 1 ? state.UserData.loadingUser : state.UserData.loadingAdmin
  );

  const activeUsers = users.filter((user) => user.isActive);
  const inactiveUsers = users.filter((user) => !user.isActive);

  const filteredActiveUsers = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInactiveUsers = inactiveUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedUser._id))
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        toast.success("User deleted successfully!");
        // Refresh data after deletion
        if (role_id === 1) {
          dispatch(getAllUsers(userData?._id));
        } else if (role_id === 2) {
          dispatch(getAllAdmins());
        }
      })
      .catch((error) => {
        toast.error("Failed to delete user");
      });
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar
        pageTitle={
          role_id === 1 ? "User Management" : "Organization Management"
        }
      />

      <main className="container-fluid py-4">
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Search and Add Section */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <InputGroup>
                      <InputGroup.Text 
                        className="border-0"
                        style={{ 
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "#3B82F6",
                          borderTopLeftRadius: "12px",
                          borderBottomLeftRadius: "12px"
                        }}
                      >
                        <BiSearch size={18} />
                      </InputGroup.Text>
                      <FormControl
                        placeholder={`Search ${role_id === 1 ? "users" : "organizations"}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0"
                        style={{ 
                          background: "rgba(59, 130, 246, 0.05)",
                          borderTopRightRadius: "12px",
                          borderBottomRightRadius: "12px"
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4} className="text-md-end mt-3 mt-md-0">
                    <Button
                      variant="primary"
                      className="px-4 py-2 fw-semibold rounded-3"
                      onClick={() => navigate("/add-admin")}
                      style={{
                        background: "linear-gradient(135deg, #3B82F6, #2563EB)"
                      }}
                    >
                      <BiUserPlus className="me-2" size={18} />
                      {role_id === 1 ? "Add User" : "Add Organization"}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Tabs Section */}
            <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-0">
                <Tabs 
                  activeKey={key} 
                  onSelect={(k) => setKey(k)} 
                  className="border-0"
                >
                  <Tab
                    eventKey="active"
                    title={
                      <div className="d-flex align-items-center gap-2 px-3 py-2">
                        <FaUsers size={16} />
                        <span>{role_id === 1 ? "Active Users" : "Active Organizations"}</span>
                        <Badge bg="success" className="ms-2 rounded-pill">
                          {filteredActiveUsers.length}
                        </Badge>
                      </div>
                    }
                    className="p-4"
                  >
                    <UserList
                      users={filteredActiveUsers}
                      navigate={navigate}
                      loading={loading}
                      role_id={role_id}
                      searchQuery={searchQuery}
                      onDeleteClick={(user) => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                    />
                  </Tab>
                  <Tab
                    eventKey="inactive"
                    title={
                      <div className="d-flex align-items-center gap-2 px-3 py-2">
                        <FaUserShield size={16} />
                        <span>{role_id === 1 ? "Inactive Users" : "Inactive Organizations"}</span>
                        <Badge bg="secondary" className="ms-2 rounded-pill">
                          {filteredInactiveUsers.length}
                        </Badge>
                      </div>
                    }
                    className="p-4"
                  >
                    <UserList
                      users={filteredInactiveUsers}
                      navigate={navigate}
                      loading={loading}
                      role_id={role_id}
                      searchQuery={searchQuery}
                      onDeleteClick={(user) => {
                        setSelectedUser(user);
                        setShowDeleteModal(true);
                      }}
                    />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)} 
        centered
        size="sm"
      >
        <Modal.Header
          closeButton
          style={{ 
            background: "linear-gradient(135deg, #DC2626, #B91C1C)",
            borderBottom: "none"
          }}
          className="text-white rounded-top"
        >
          <Modal.Title className="fw-bold d-flex align-items-center gap-2">
            <BiTrash />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="text-center p-4">
          <div className="mb-3">
            <div
              className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center mx-auto"
              style={{ width: "60px", height: "60px" }}
            >
              <BiTrash size={24} />
            </div>
          </div>
          <h5 className="fw-bold mb-2" style={{ color: "#1f2937" }}>
            Delete {selectedUser?.name}?
          </h5>
          <p className="text-muted mb-0">
            This action cannot be undone. All data will be permanently removed.
          </p>
        </Modal.Body>
        
        <Modal.Footer className="d-flex justify-content-center gap-2 p-4 border-top">
          <Button
            variant="outline-secondary"
            className="px-4 py-2 fw-semibold rounded-3"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          
          <Button
            variant="danger"
            className="px-4 py-2 fw-semibold rounded-3"
            onClick={handleDeleteUser}
            style={{
              background: "linear-gradient(135deg, #DC2626, #B91C1C)"
            }}
          >
            <BiTrash className="me-2" />
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const UserList = ({ users, navigate, loading, role_id, searchQuery, onDeleteClick }) => {
  if (loading) {
    return <Loader text={role_id === 1 ? "Loading users" : "Loading organizations"} />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-3">
          <FaUsers size={48} className="text-muted" />
        </div>
        <h6 className="text-muted">No {role_id === 1 ? "users" : "organizations"} found</h6>
        <p className="text-muted small">
          {searchQuery ? "Try adjusting your search criteria" : `No ${role_id === 1 ? "users" : "organizations"} available`}
        </p>
      </div>
    );
  }

  return (
    <ListGroup className="border-0">
      {users.map((user) => (
        <motion.div
          key={user._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
           className="border-0 mb-3"
            style={{
              borderRadius: "12px",
               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onClick={() => {
              if (role_id === 1) {
                navigate("/trackingdata", { state: { item: user } });
              } else if (role_id === 2) {
                navigate(`/list-users/${user._id}`);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
          >
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {user?.avtar ? (
                    <img
                      src={user?.avtar}
                      alt="User Avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "16px",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                        marginRight: "16px"
                      }}
                    >
                      <FaUser size={20} className="text-white" />
                    </div>
                  )}
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
                      {user.name}
                    </h6>
                    <p className="text-muted small mb-0">{user.email}</p>
                    <Badge 
                      bg={user.isActive ? "success" : "secondary"}
                      className="rounded-pill mt-1"
                      style={{ fontSize: "10px" }}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (role_id === 1) {
                        navigate("/trackingdata", { state: { item: user } });
                      } else if (role_id === 2) {
                        navigate(`/list-users/${user._id}`);
                      }
                    }}
                  >
                    View Details
                  </Button>
                  
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/add-admin", { state: { user } });
                    }}
                  >
                    <BiPencil size={14} />
                  </Button>
                  
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteClick(user);
                    }}
                  >
                    <BiTrash size={14} />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </ListGroup>
  );
};

export default User;
