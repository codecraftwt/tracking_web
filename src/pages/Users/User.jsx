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
} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { BiSearch, BiUserPlus, BiPencil } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllAdmins, getAllUsers } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import CustomButton from "../../components/CustomButton";

const User = () => {
  const [key, setKey] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <div>
      <Navbar
        pageTitle={role_id === 1 ? "All User's Details" : "All Admin's Details"}
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
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </main>
    </div>
  );
};

const UserList = ({ users, navigate, loading, role_id }) => {
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
            onClick={() => navigate(`/list-users/${user._id}`)}
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
              <span
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#007bff",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/add-admin", { state: { user } });
                }}
              >
                <BiPencil className="text-white fs-5" />
              </span>
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
