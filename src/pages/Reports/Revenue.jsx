import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import { Container, Row, Col, Card, Table, Badge, Form, InputGroup, FormControl } from "react-bootstrap";
import { motion } from "framer-motion";
import { 
  FaDollarSign, 
  FaUsers, 
  FaCalendarAlt, 
  FaSearch,
  FaChartLine,
  FaFilter,
  FaRupeeSign
} from "react-icons/fa";

const Revenue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");

  const paidUsers = [
    // { 
    //   name: "John Doe", 
    //   date: "2025-03-01", 
    //   amount: 100,
    //   status: "completed",
    //   plan: "Premium"
    // },
    // { 
    //   name: "Jane Smith", 
    //   date: "2025-03-02", 
    //   amount: 200,
    //   status: "completed",
    //   plan: "Enterprise"
    // },
    // { 
    //   name: "Mike Johnson", 
    //   date: "2025-03-03", 
    //   amount: 150,
    //   status: "completed",
    //   plan: "Standard"
    // },
    // { 
    //   name: "Sarah Wilson", 
    //   date: "2025-03-04", 
    //   amount: 300,
    //   status: "completed",
    //   plan: "Enterprise"
    // },
    // { 
    //   name: "David Brown", 
    //   date: "2025-03-05", 
    //   amount: 75,
    //   status: "completed",
    //   plan: "Basic"
    // },
  ];

  // Calculate total revenue dynamically
  const totalRevenue = paidUsers.reduce((sum, user) => sum + user.amount, 0);
  const totalUsers = paidUsers.length;
  const averageRevenue = totalRevenue / totalUsers;

  // Filter users based on search and month
  const filteredUsers = paidUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.plan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = filterMonth === "all" || user.date.startsWith(filterMonth);
    return matchesSearch && matchesMonth;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <Navbar pageTitle="Revenue Analytics" />
      
      <motion.main 
        className="container-fluid py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="mb-3">
              <Row className="g-2">
                <Col xs={6} sm={3}>
                  <Card className="border-0 shadow-sm text-center" style={{ borderRadius: "8px" }}>
                    <Card.Body className="p-2">
                      <div className="mb-1">
                        <div
                          className="p-1 rounded-2 mx-auto"
                          style={{ 
                            width: "fit-content",
                            background: "rgba(34, 197, 94, 0.1)",
                            color: "#22C55E"
                          }}
                        >
                          <FaRupeeSign size={14} />
                        </div>
                      </div>
                      <h6 className="fw-bold mb-0" style={{ color: "#1f2937", fontSize: "1.1rem" }}>
                       {totalRevenue.toLocaleString()}
                      </h6>
                      <p className="text-muted mb-0" style={{ fontSize: "0.7rem" }}>Total Revenue</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} sm={3}>
                  <Card className="border-0 shadow-sm text-center" style={{ borderRadius: "8px" }}>
                    <Card.Body className="p-2">
                      <div className="mb-1">
                        <div
                          className="p-1 rounded-2 mx-auto"
                          style={{ 
                            width: "fit-content",
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3B82F6"
                          }}
                        >
                          <FaUsers size={14} />
                        </div>
                      </div>
                      <h6 className="fw-bold mb-0" style={{ color: "#1f2937", fontSize: "1.1rem" }}>
                        {totalUsers}
                      </h6>
                      <p className="text-muted mb-0" style={{ fontSize: "0.7rem" }}>Paid Users</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} sm={3}>
                  <Card className="border-0 shadow-sm text-center" style={{ borderRadius: "8px" }}>
                    <Card.Body className="p-2">
                      <div className="mb-1">
                        <div
                          className="p-1 rounded-2 mx-auto"
                          style={{ 
                            width: "fit-content",
                            background: "rgba(168, 85, 247, 0.1)",
                            color: "#A855F7"
                          }}
                        >
                          <FaChartLine size={14} />
                        </div>
                      </div>
                      <h6 className="fw-bold mb-0" style={{ color: "#1f2937", fontSize: "1.1rem" }}>
                        {averageRevenue.toFixed(0)}
                      </h6>
                      <p className="text-muted mb-0" style={{ fontSize: "0.7rem" }}>Average Revenue</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} sm={3}>
                  <Card className="border-0 shadow-sm text-center" style={{ borderRadius: "8px" }}>
                    <Card.Body className="p-2">
                      <div className="mb-1">
                        <div
                          className="p-1 rounded-2 mx-auto"
                          style={{ 
                            width: "fit-content",
                            background: "rgba(245, 158, 11, 0.1)",
                            color: "#F59E0B"
                          }}
                        >
                          <FaCalendarAlt size={14} />
                        </div>
                      </div>
                      <h6 className="fw-bold mb-0" style={{ color: "#1f2937", fontSize: "1.1rem" }}>
                        {new Date().getMonth() + 1}
                      </h6>
                      <p className="text-muted mb-0" style={{ fontSize: "0.7rem" }}>Current Month</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div variants={itemVariants} className="mb-4">
              <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
                <Card.Body className="p-4">
                  <Row className="align-items-center">
                    <Col md={6}>
                      <InputGroup>
                        <InputGroup.Text 
                          className="border-0"
                          style={{ 
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3B82F6",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px"
                          }}
                        >
                          <FaSearch size={16} />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Search by name or plan..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border-0"
                          style={{ 
                            background: "rgba(59, 130, 246, 0.05)",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px"
                          }}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={3}>
                      <InputGroup>
                        <InputGroup.Text 
                          className="border-0"
                          style={{ 
                            background: "rgba(168, 85, 247, 0.1)",
                            color: "#A855F7",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px"
                          }}
                        >
                          <FaFilter size={16} />
                        </InputGroup.Text>
                        <Form.Select
                          value={filterMonth}
                          onChange={(e) => setFilterMonth(e.target.value)}
                          className="border-0"
                          style={{ 
                            background: "rgba(168, 85, 247, 0.05)",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px"
                          }}
                        >
                          <option value="all">All Months</option>
                          <option value="2025-01">January 2025</option>
                          <option value="2025-02">February 2025</option>
                          <option value="2025-03">March 2025</option>
                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col md={3} className="text-md-end mt-3 mt-md-0">
                      <Badge 
                        bg="primary" 
                        className="px-3 py-2 rounded-pill"
                        style={{ fontSize: "14px" }}
                      >
                        <FaUsers className="me-2" />
                        {filteredUsers.length} Results
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Revenue Table */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
                <Card.Header 
                  className="border-0 p-4"
                  style={{ 
                    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px"
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="text-white fw-bold mb-1">Revenue Details</h5>
                      <p className="text-white-50 mb-0 small">
                        Complete breakdown of all revenue transactions
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Badge 
                        bg="light" 
                        className="text-primary px-3 py-2 rounded-pill"
                        style={{ fontSize: "14px" }}
                      >
                        <FaRupeeSign className="me-2" />
                       {totalRevenue.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table className="mb-0">
                      <thead>
                        <tr style={{ background: "rgba(59, 130, 246, 0.05)" }}>
                          <th className="border-0 p-3 fw-semibold" style={{ color: "#374151" }}>
                            Customer
                          </th>
                          <th className="border-0 p-3 fw-semibold" style={{ color: "#374151" }}>
                            Plan
                          </th>
                          <th className="border-0 p-3 fw-semibold" style={{ color: "#374151" }}>
                            Date
                          </th>
                          <th className="border-0 p-3 fw-semibold text-end" style={{ color: "#374151" }}>
                            Amount
                          </th>
                          <th className="border-0 p-3 fw-semibold text-center" style={{ color: "#374151" }}>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ 
                              cursor: "pointer",
                              transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(59, 130, 246, 0.02)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            <td className="border-0 p-3">
                              <div className="d-flex align-items-center">
                                <div
                                  className="d-flex align-items-center justify-content-center me-3"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="fw-semibold" style={{ color: "#1f2937" }}>
                                    {user.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="border-0 p-3">
                              <Badge 
                                bg={
                                  user.plan === "Enterprise" ? "primary" :
                                  user.plan === "Premium" ? "success" :
                                  user.plan === "Standard" ? "warning" : "secondary"
                                }
                                className="rounded-pill px-3 py-2"
                                style={{ fontSize: "12px" }}
                              >
                                {user.plan}
                              </Badge>
                            </td>
                            <td className="border-0 p-3">
                              <div className="d-flex align-items-center">
                                <FaCalendarAlt className="me-2 text-muted" size={14} />
                                <span className="text-muted">{user.date}</span>
                              </div>
                            </td>
                            <td className="border-0 p-3 text-end">
                              <span className="fw-bold text-success fs-6">
                               {user.amount.toLocaleString()}
                              </span>
                            </td>
                            <td className="border-0 p-3 text-center">
                              <Badge 
                                bg="success" 
                                className="rounded-pill px-3 py-2"
                                style={{ fontSize: "12px" }}
                              >
                                {user.status}
                              </Badge>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-5">
                      <div className="mb-3">
                      <FaRupeeSign size={48} className="text-muted" />
                      </div>
                      <h6 className="text-muted">No revenue data found</h6>
                      <p className="text-muted small">
                        {searchQuery ? "Try adjusting your search criteria" : "No transactions available"}
                      </p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.main>
    </div>
  );
};

export default Revenue;
