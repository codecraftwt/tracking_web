import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { BiUser } from "react-icons/bi";
import { Table, Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const Listusers = () => {
  const { adminId } = useParams();
  const users = useSelector((state) => state.UserData.usersList) || [];
  const loading = useSelector((state) => state.UserData.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (adminId) {
      dispatch(getAllUsers(adminId));
    }
  }, [adminId, dispatch]);

  const tableStyle = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9rem",
  };

  const tdThStyle = {
    fontSize: "0.85rem",
  };

  return (
    <div>
      <Navbar pageTitle="List of Users of ADMIN" />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            {loading ? (
              <Loader text="Getting users" />
            ) : (
              <Table
                striped
                bordered
                hover
                responsive
                style={tableStyle} // Apply tableStyle here
              >
                <thead>
                  <tr>
                    <th style={tdThStyle}>Sr. No.</th>
                    <th style={tdThStyle}>Profile</th>
                    <th style={tdThStyle}>Name</th>
                    <th style={tdThStyle}>Email</th>
                    <th style={tdThStyle}>Mobile Number</th>
                    <th style={tdThStyle}>Status</th>
                    <th style={tdThStyle}>Address</th>
                    <th style={tdThStyle}>Created At</th>
                    <th style={tdThStyle}>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id}>
                        <td style={tdThStyle}>{index + 1}</td>
                        <td
                          style={{
                            ...tdThStyle,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {user.avtar ? (
                            <img
                              src={user.avtar}
                              alt="User Avatar"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <BiUser style={{ fontSize: "30px" }} />
                          )}
                        </td>
                        <td style={tdThStyle}>{user.name}</td>
                        <td style={tdThStyle}>{user.email}</td>
                        <td style={tdThStyle}>{user.mobile_no}</td>
                        <td style={tdThStyle}>
                          {user.isActive ? "Active" : "Inactive"}
                        </td>
                        <td style={tdThStyle}>{user.address}</td>
                        <td style={tdThStyle}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td style={tdThStyle}>
                          {new Date(user.updatedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center" style={tdThStyle}>
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Listusers;
