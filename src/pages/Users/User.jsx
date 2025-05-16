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
} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { BiSearch, BiUserPlus, BiPencil, BiTrash } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAllAdmins,
  getAllUsers,
  deleteUser,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";

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
    <div>
      <Navbar
        pageTitle={
          role_id === 1 ? "All User's Details" : "All organization's Details"
        }
      />

      <main className="container my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <InputGroup style={{ maxWidth: "400px" }}>
                <InputGroup.Text
                  style={{ background: "#f8f9fa", borderRight: "none" }}
                >
                  <BiSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder={`Search ${
                    role_id === 1 ? "users" : "admins"
                  }...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderLeft: "none", background: "#f8f9fa" }}
                />
              </InputGroup>

              <CustomButton
                handleClick={() => navigate("/add-admin")}
                text={role_id === 1 ? "Add User" : "Add Admin"}
                icon={BiUserPlus}
              />
            </div>

            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
              <Tab
                eventKey="active"
                title={role_id === 1 ? "Active Users" : "Active Admins"}
                className="p-3"
              >
                <UserList
                  users={filteredActiveUsers}
                  navigate={navigate}
                  loading={loading}
                  role_id={role_id}
                  onDeleteClick={(user) => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                />
              </Tab>
              <Tab
                eventKey="inactive"
                title={role_id === 1 ? "Inactive Users" : "Inactive Admins"}
                className="p-3"
              >
                <UserList
                  users={filteredInactiveUsers}
                  navigate={navigate}
                  loading={loading}
                  role_id={role_id}
                  onDeleteClick={(user) => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <Modal.Header closeButton className="bg-danger text-white">
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    <p className="h5">Are you sure you want to delete <strong>{selectedUser?.name}</strong>?</p>
    <p className="text-muted">This action cannot be undone.</p>
  </Modal.Body>
  <Modal.Footer className="justify-content-center">
    <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDeleteUser} className="ms-3">
      Delete
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

const UserList = ({ users, navigate, loading, role_id, onDeleteClick }) => {
  if (loading) {
    return <Loader text={role_id === 1 ? "Getting users" : "Getting admins"} />;
  }

  return (
    <ListGroup>
      {users.length > 0 ? (
        users.map((user) => (
          <Card
            key={user._id}
            className="mb-3 shadow-sm user-card"
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              transition: "0.3s",
              cursor: "pointer",
            }}
            onClick={() => {
              if (role_id === 1) {
                navigate("/trackingdata", { state: { item: user } });
              } else if (role_id === 2) {
                navigate(`/list-users/${user._id}`);
              }
            }}
          >
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                {user?.avtar ? (
                  <img
                    src={user?.avtar}
                    alt="User Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <FaUser
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                      marginRight: "10px",
                    }}
                  />
                )}
                <div>
                  <h6
                    className="mb-1"
                    style={{ fontWeight: "600", color: "#2c3e50" }}
                  >
                    {user.name}
                  </h6>
                  <p className="text-muted small mb-0">{user.email}</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    backgroundColor: "#007bff",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/add-admin", { state: { user } });
                  }}
                >
                  <BiPencil className="text-white fs-6" />
                </span>
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    backgroundColor: "tomato",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(user);
                  }}
                >
                  <BiTrash className="text-white fs-6" />
                </span>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center text-muted">No users found.</p>
      )}
    </ListGroup>
  );
};

export default User;
