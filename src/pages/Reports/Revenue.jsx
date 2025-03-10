import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const Revenue = () => {
  const paidUsers = [
    { name: "John Doe", date: "2025-03-01", amount: 100 },
    { name: "Jane Smith", date: "2025-03-02", amount: 200 },
    { name: "Mike Johnson", date: "2025-03-03", amount: 150 },
  ];

  // Calculate total revenue dynamically
  const totalRevenue = paidUsers.reduce((sum, user) => sum + user.amount, 0);

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Navbar pageTitle="Revenue Details" />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={11}>
            {/* Paid Users Table */}
            <Card className="shadow-lg rounded mb-4 border-0">
              <Card.Header className="bg-primary text-white text-center">
                <h5 className="mb-0 fw-bold">Paid Users</h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover striped className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paidUsers.map((user, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{user.name}</td>
                          <td>{user.date}</td>
                          <td className="text-success fw-bold">
                            ${user.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Total Revenue */}
            <Card className="shadow-lg rounded text-center border-0">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0 fw-bold">Total Revenue</h5>
              </Card.Header>
              <Card.Body>
                <p className="display-6 text-success fw-bold">
                  ${totalRevenue}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Revenue;
