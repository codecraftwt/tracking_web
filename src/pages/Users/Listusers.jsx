import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { BiUser } from "react-icons/bi";
import { Table, Container, Row, Col, Tabs, Tab, Badge } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";

const UserTable = ({ users, status }) => {
  const navigate = useNavigate();

  const handleRowClick = (user) => {
    navigate("/trackingdata", { state: { item: user } });
  };

  return (
    <Table
      striped
      hover
      responsive
      className="shadow-sm rounded overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid #dee2e6", // outer border around table
        borderCollapse: "separate",
        borderSpacing: 0,
      }}
    >
      <thead
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          fontWeight: "600",
          fontSize: "0.85rem",
        }}
      >
        <tr>
          <th
            className="text-center"
            style={{ borderRight: "1px solid #dee2e6" }}
          >
            Sr. No.
          </th>
          <th
            className="text-center"
            style={{ borderRight: "1px solid #dee2e6" }}
          >
            Profile
          </th>
          <th style={{ borderRight: "1px solid #dee2e6" }}>Name</th>
          <th style={{ borderRight: "1px solid #dee2e6" }}>Email</th>
          <th style={{ borderRight: "1px solid #dee2e6" }}>Mobile Number</th>
          <th
            className="text-center"
            style={{ borderRight: "1px solid #dee2e6" }}
          >
            Status
          </th>
          <th style={{ borderRight: "1px solid #dee2e6" }}>Address</th>
          <th style={{ borderRight: "1px solid #dee2e6" }}>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody style={{ fontSize: "0.82rem" }}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr
              key={user._id}
              onClick={() => handleRowClick(user)}
              style={{ cursor: "pointer" }}
              className="align-middle"
            >
              <td
                className="text-center"
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {index + 1}
              </td>
              <td
                className="text-center"
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {user.avtar ? (
                  <img
                    src={user.avtar}
                    alt="User Avatar"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                    }}
                  />
                ) : (
                  <BiUser
                    style={{
                      fontSize: "26px",
                      color: "#6c757d",
                    }}
                  />
                )}
              </td>
              <td
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                  fontWeight: "600",
                }}
              >
                {user.name}
              </td>
              <td
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {user.email}
              </td>
              <td
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {user.mobile_no}
              </td>
              <td
                className="text-center"
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                <Badge
                  bg={user.isActive ? "success" : "danger"}
                  className="rounded-pill px-3 py-1 d-inline-flex align-items-center"
                  style={{ fontSize: "0.70rem", gap: "0.3rem" }}
                >
                  {user.isActive ? (
                    <>
                      <FaCheckCircle size={14} />
                      Active
                    </>
                  ) : (
                    <>
                      <FaTimesCircle size={14} />
                      Inactive
                    </>
                  )}
                </Badge>
              </td>
              <td
                style={{
                  maxWidth: "180px",
                  wordBreak: "break-word",
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {user.address || "—"}
              </td>
              <td
                style={{
                  borderRight: "1px solid #dee2e6",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {formatDateDDMMYYYY(user.createdAt)}
              </td>
              <td style={{ borderBottom: "1px solid #dee2e6" }}>
                {formatDateDDMMYYYY(user.updatedAt)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="9"
              className="text-center py-4 text-muted"
              style={{ borderBottom: "none" }}
            >
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
    <>
      <Navbar pageTitle="List of Users" showBackButton={true} />
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col md={11}>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3 border-bottom"
              variant="pills"
              mountOnEnter
              unmountOnExit
            >
              <Tab
                eventKey="active"
                title={
                  <span
                    className={
                      activeTab === "active"
                        ? "fw-semibold text-white"
                        : "text-muted"
                    }
                  >
                    Active Users
                  </span>
                }
              >
                {loading ? (
                  <Loader text="Getting users" />
                ) : (
                  <UserTable users={activeUsers} status="Active" />
                )}
              </Tab>

              <Tab
                eventKey="inactive"
                title={
                  <span
                    className={
                      activeTab === "inactive"
                        ? "fw-semibold text-white"
                        : "text-muted"
                    }
                  >
                    Inactive Users
                  </span>
                }
              >
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
    </>
  );
};

export default Listusers;
