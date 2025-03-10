import React, { useState } from "react";
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
import { BiSearch, BiUserPlus, BiPencil } from "react-icons/bi"; // Import Icons
import { useNavigate } from "react-router-dom";

const User = ({ users }) => {
  const [key, setKey] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Sample Data for Active and Inactive Users
  const activeUsers = [
    { id: 1, name: "testTrack", email: "testTrack@gmail.com" },
    { id: 2, name: "tester10", email: "tester10@gmail.com" },
    { id: 3, name: "user10", email: "user10@gmail.com" },
    { id: 4, name: "Elma", email: "elma@gmail.com" },
    { id: 5, name: "Maria", email: "maria@gmail.com" },
    { id: 6, name: "Mary", email: "Mary@yamail.com" },
  ];

  const inactiveUsers = [
    { id: 7, name: "InactiveUser1", email: "inactive1@example.com" },
    { id: 8, name: "InactiveUser2", email: "inactive2@example.com" },
  ];

  // Filter users based on search query
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
      <Navbar pageTitle="All Admin's Details" />
      <main className="container my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            {/* Search Bar and Add User Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <InputGroup style={{ maxWidth: "400px" }}>
                <InputGroup.Text
                  style={{ background: "#f8f9fa", borderRight: "none" }}
                >
                  <BiSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search admins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderLeft: "none", background: "#f8f9fa" }}
                />
              </InputGroup>
              <Button
                variant="primary"
                className="d-flex align-items-center"
                onClick={() => navigate("/todays-active-users")}
              >
                <BiUserPlus className="me-2" /> Add Admin
              </Button>
            </div>

            {/* Tabbed Interface */}
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
              <Tab eventKey="active" title="Active Admins" className="p-3">
                <UserList users={filteredActiveUsers} navigate={navigate} />
              </Tab>
              <Tab eventKey="inactive" title="Inactive Admins" className="p-3">
                <UserList users={filteredInactiveUsers} navigate={navigate} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </main>
    </div>
  );
};

// Reusable Component for User List
const UserList = ({ users, navigate }) => {
  const handleEdit = (user) => {
    navigate("/todays-active-users", { state: { user } });
  };

  return (
    <ListGroup>
      {users.map((user) => (
        <Card
          key={user.id}
          className="mb-3 shadow-sm user-card"
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            transition: "0.3s",
            cursor: "pointer",
          }}
          onClick={() => navigate("/listusers")}
        >
          <Card.Body className="d-flex align-items-center justify-content-between">
            <div>
              <h6
                className="mb-1"
                style={{ fontWeight: "600", color: "#2c3e50" }}
              >
                {user.name}
              </h6>
              <p className="text-muted small mb-0">{user.email}</p>
            </div>
            <span
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#007bff",
              }}
            >
              <BiPencil className="text-white fs-5" />
            </span>
          </Card.Body>
        </Card>
      ))}
    </ListGroup>
  );
};

export default User;
