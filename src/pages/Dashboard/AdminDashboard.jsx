import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [mostRecentUsers, setMostRecentUsers] = useState([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);

  const userData = useSelector((state) => state.UserData.userInfo);

  useEffect(() => {
    dispatch(getAllUsers(userData?._id)).then((response) => {
      const users = response.payload || [];

      const today = new Date().toISOString().split("T")[0];

      const checkedOutUsers = users.filter(
        (user) => user.status === "0" && user.updatedAt?.split("T")[0] === today
      );
      const checkedInUsers = users.filter(
        (user) => user.status === "1" && user.updatedAt?.split("T")[0] === today
      );

      setCheckedOutCount(checkedOutUsers.length);
      setCheckedInCount(checkedInUsers.length);

      const usersUpdatedToday = users.filter(
        (user) => user.updatedAt?.split("T")[0] === today
      );

      const sortedUsers = usersUpdatedToday.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      const recentUsers = sortedUsers.slice(0, 3);
      setMostRecentUsers(recentUsers);

      const activeUsers = users.filter((user) => user.isActive === true);
      const inactiveUsers = users.filter((user) => user.isActive === false);

      setTotalActiveUsers(activeUsers.length);
      setTotalInActiveUsers(inactiveUsers.length);
    });
  }, [dispatch]);

  const userStats = [
    { key: "activeUsers", label: "Active Users", count: totalActiveUsers },
    {
      key: "inactiveUsers",
      label: "Inactive Users",
      count: totalInActiveUsers,
    },
    { key: "checkedInUsers", label: "Checked In Users", count: checkedInCount },
    {
      key: "checkedOutUsers",
      label: "Checked Out Users",
      count: checkedOutCount,
    },
  ];

  return (
    <div className="bg-white min-vh-100">
      <Navbar pageTitle="Dashboard" />
      <main className="container my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            {/* Tracking Overview Section */}
            <section className="mb-5">
              <h5 className="fw-bold mb-4">Tracking Overview :</h5>
              <Row className="g-4">
                {userStats.map(({ label, count }, index) => (
                  <Col key={index} xs={12} sm={6} md={3}>
                    <div className="card text-center p-3 shadow-sm border-0 rounded-3 h-100 bg-light">
                      <h3 className="fw-bold mb-2">{count}</h3>
                      <p className="text-muted small mb-0">{label}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </section>

            {/* Recent Activities Section */}
            <section className="mb-5">
              <h5 className="fw-bold mb-4">Recent Activities</h5>
              <div className="card p-3 shadow-sm border-0 rounded-3">
                <ul className="list-unstyled mb-0">
                  {mostRecentUsers.length > 0 ? (
                    mostRecentUsers.map((user, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between align-items-center py-2 border-bottom"
                      >
                        <div className="d-flex align-items-center">
                          <span
                            className="me-3"
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor:
                                user.status === "1" ? "green" : "gray",
                            }}
                          ></span>
                          <div>
                            <span className="fw-bold">{user.name}</span>
                            <span className="text-muted ms-2">
                              {user.status === "1"
                                ? "Checked In"
                                : "Checked Out"}
                            </span>
                          </div>
                        </div>
                        <span className="text-muted small">
                          {new Date(user.updatedAt).toLocaleTimeString()}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-center py-2">No recent activity</li>
                  )}
                </ul>
              </div>
            </section>

            {/* Quick Actions Section */}
            <section>
              <h5 className="fw-bold mb-4">Quick Actions</h5>
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <button
                    className="btn btn-primary w-100 py-2 rounded-3 fw-bold"
                    onClick={() => navigate("/add-admin")}
                  >
                    Add New User
                  </button>
                </Col>
                <Col xs={12} sm={6}>
                  <button
                    className="btn btn-outline-secondary w-100 py-2 rounded-3 fw-bold"
                    onClick={() => navigate("/manage-plans")}
                  >
                    Payment Plans
                  </button>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default AdminDashboard;
