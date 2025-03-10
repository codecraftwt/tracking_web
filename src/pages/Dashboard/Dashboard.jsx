import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("Welcome to the Dashboard!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  }, [location.state]);

  return (
    <div className="bg-light min-vh-100">
      <Navbar pageTitle="Dashboard" />
      <main className="container my-4">
        <Row className="justify-content-center">
          <Col md={11}>
            {/* Revenue Section */}
            <section className="mb-4">
              <div className="card p-4 shadow-sm border-0 rounded-3">
                <h5 className="text-muted text-uppercase small fw-bold">
                  Total Revenue
                </h5>
                <h2 className="text-success fw-bold mb-4">$24,500</h2>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="fw-bold">$18,200</h5>
                    <p className="text-muted small">This Month</p>
                  </div>
                  <div>
                    <h5 className="fw-bold">$6,300</h5>
                    <p className="text-muted small">Last Month</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tracking Overview Section */}
            <section className="mb-4">
              <h5 className="fw-bold mb-3">Tracking Overview</h5>
              <div className="row g-3">
                {[
                  "Active Admins",
                  "Inactive Admins",
                  "Active All Users",
                  "Inactive All Users",
                ].map((item, index) => (
                  <div key={index} className="col-6 col-md-3">
                    <div className="card text-center p-3 shadow-sm border-0 rounded-3 h-100">
                      <h3 className="fw-bold mb-2">0</h3>
                      <p className="text-muted small mb-0">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions Section */}
            <section>
              <h5 className="fw-bold mb-3">Quick Actions</h5>
              <div className="row g-3">
                <div className="col-6">
                  <button
                    className="btn btn-primary w-100 py-2 rounded-3 fw-bold"
                    onClick={() => navigate("/todays-active-users")}
                  >
                    Add New Admin
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-outline-secondary w-100 py-2 rounded-3 fw-bold"
                    onClick={() => navigate("/manage-plans")}
                  >
                    Manage Active Plans
                  </button>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
