import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { BiUser } from "react-icons/bi";
import { Table, Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const UserTable = ({ users, status }) => (
  <Table striped bordered hover responsive className="tableStyle">
    <thead>
      <tr className="tdThStyle">
        <th>Sr. No.</th>
        <th>Profile</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile Number</th>
        <th>Status</th>
        <th>Address</th>
        <th>Created At</th>
        <th>Updated At</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user, index) => (
          <tr key={user._id} className="tdThStyle">
            <td>{index + 1}</td>
            <td className="text-center">
              {user.avtar ? (
                <img
                  src={user.avtar}
                  alt="User Avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              ) : (
                <BiUser style={{ fontSize: "30px" }} />
              )}
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.mobile_no}</td>
            <td>{status}</td>
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
