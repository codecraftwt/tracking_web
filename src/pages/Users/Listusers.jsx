import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { BiUser } from "react-icons/bi";
import { Table, Container, Row, Col, Tabs, Tab, Badge } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { FaRupeeSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserTable = ({ users, status }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleRowClick = (user) => {
    // Navigate to /trackingdata and pass the user object as state
    navigate("/trackingdata", { state: { item: user } });
  };

  return (
    <Table striped bordered hover responsive className="tableStyle">
      <thead style={{ background: "rgba(59, 130, 246, 0.05)" }}>
        <tr className="tdThStyle">
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Sr. No.
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Profile
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Name
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Email
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Mobile Number
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Status
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Address
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Created At
          </th>
          <th className="fw-semibold" style={{ color: "#374151" }}>
            Updated At
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr
              key={user._id}
              className="tdThStyle"
              onClick={() => handleRowClick(user)} // Add onClick to each row
              style={{ cursor: "pointer" }} // Change cursor on hover
            >
              <td>{index + 1}</td>
              <td className="text-center">
                {user.avtar ? (
                  <img
                    src={user.avtar}
                    alt="User Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <BiUser style={{ fontSize: "30px" }} />
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile_no}</td>
              <td>
                <Badge
                  bg={user.isActive ? "success" : "danger"}
                  className="rounded-pill px-3 py-2"
                  style={{ fontSize: "12px" }}
                >
                  {user.isActive ? (
                    <>
                      <FaCheckCircle size={12} className="me-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <FaTimesCircle size={12} className="me-1" />
                      Inactive
                    </>
                  )}
                </Badge>
              </td>
              <td>{user.address}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-center tdThStyle">
              No {status.toLowerCase()} users found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const Listusers = () => {
  const { adminId } = useParams();
  const { usersList: users = [], loading } = useSelector(
    (state) => state.UserData
  );
  const [activeTab, setActiveTab] = useState("active");
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminId) dispatch(getAllUsers(adminId));
  }, [adminId, dispatch]);

  const activeUsers = users.filter((user) => user.isActive);
  const inactiveUsers = users.filter((user) => !user.isActive);

  return (
    <div>
      <Navbar pageTitle="List of Users" />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Tab eventKey="active" title="Active Users">
                {loading ? (
                  <Loader text="Getting users" />
                ) : (
                  <UserTable users={activeUsers} status="Active" />
                )}
              </Tab>
              <Tab eventKey="inactive" title="Inactive Users">
                {loading ? (
                  <Loader text="Getting users" />
                ) : (
                  <UserTable users={inactiveUsers} status="Inactive" />
                )}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Listusers;
