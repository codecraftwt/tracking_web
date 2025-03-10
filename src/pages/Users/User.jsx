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
import { useNavigate } from "react-router-dom";
import { getAllAdmins } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const [key, setKey] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const admins = useSelector((state) => state.UserData.adminList) || [];
  const dispatch = useDispatch();

  console.log("Admins List --------->", admins);

  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  // **Filter Admins into Active & Inactive Lists**
  const activeAdmins = admins.filter((admin) => admin.isActive);
  const inactiveAdmins = admins.filter((admin) => !admin.isActive);

  // **Search Filtering for Active & Inactive Admins**
  const filteredActiveAdmins = activeAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInactiveAdmins = inactiveAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
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
                onClick={() => navigate("/add-admin")}
              >
                <BiUserPlus className="me-2" /> Add Admin
              </Button>
            </div>

            {/* Tabbed Interface */}
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
              <Tab eventKey="active" title="Active Admins" className="p-3">
                <UserList users={filteredActiveAdmins} navigate={navigate} />
              </Tab>
              <Tab eventKey="inactive" title="Inactive Admins" className="p-3">
                <UserList users={filteredInactiveAdmins} navigate={navigate} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </main>
    </div>
  );
};

// **Reusable Component for Admin List**
const UserList = ({ users, navigate }) => {
  return (
    <ListGroup>
      {users.length > 0 ? (
        users.map((admin) => (
          <Card
            key={admin._id}
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
                  {admin.name}
                </h6>
                <p className="text-muted small mb-0">{admin.email}</p>
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
                  navigate("/add-admin", { state: { admin } });
                }}
              >
                <BiPencil className="text-white fs-5" />
              </span>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center text-muted">No admins found.</p>
      )}
    </ListGroup>
  );
};

export default User;
