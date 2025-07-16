import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Navbar,
  Nav,
} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import logo333 from "../../../src/assets/Images/logo333.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../redux/slices/contactSlice";

const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.contact); // Selector for loading and error from Redux store

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Form Validation
  const validateForm = () => {
    const errors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // If validation fails, do not proceed

    const contactData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // Dispatch the createContact action to store the contact data
    try {
      await dispatch(createContact(contactData));
      // Clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setFormErrors({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        color: "#fff",
      }}
    >
      <Navbar
        expand="lg"
        className="shadow-sm"
        style={{
          background: "linear-gradient(135deg, #4A90E2, #2563EB, #1E3A8A)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          marginBottom: "3rem",
        }}
      >
        <Container>
          <img
            src={logo333}
            alt="mainlogo"
            style={{
              height: "60px",
              marginBottom: "5px",
              paddingRight: "10px",
            }}
          />
          <Navbar.Brand
            style={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Team Trackify
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="bg-white"
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="d-flex gap-3">
              <button
                className="btn btn-outline-light rounded-lg px-4"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-light rounded-lg px-4"
                onClick={() => navigate("/")}
              >
                Home
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="g-5">
          {/* Form Section */}
          <Col xs={12} md={6} data-aos="fade-right">
            <Card className="h-100 shadow-lg border-0 rounded-4">
              <Card.Body className="p-4 p-md-5">
                <h3 className="mb-4 fw-semibold text-center text-primary">
                  Get in Touch
                </h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                    {formErrors.name && (
                      <div className="text-danger">{formErrors.name}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                    {formErrors.email && (
                      <div className="text-danger">{formErrors.email}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message"
                    />
                    {formErrors.message && (
                      <div className="text-danger">{formErrors.message}</div>
                    )}
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-semibold py-2 rounded-pill"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {/* {error && (
                    <div className="mt-3 text-danger text-center">
                      {error.message || "An error occurred. Please try again."}
                    </div>
                  )} */}
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Info Section */}
          <Col xs={12} md={6} data-aos="fade-left">
            <Card className="h-100 shadow-lg border-0 rounded-4">
              <Card.Body className="p-4 p-md-5">
                <h3 className="mb-4 fw-semibold text-center text-primary">
                  Contact Information
                </h3>

                <div className="mb-4 d-flex align-items-start">
                  <FaMapMarkerAlt
                    className="me-3 mt-1 text-primary"
                    size={18}
                  />
                  <div>
                    <p className="mb-1 fw-bold">Address</p>
                    <p className="mb-0 text-muted">
                      1 Rukmini Nagar, Front Of Datta Mandir, <br />
                      2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005
                    </p>
                  </div>
                </div>

                <div className="mb-4 d-flex align-items-start">
                  <FaEnvelope className="me-3 mt-1 text-primary" size={18} />
                  <div>
                    <p className="mb-1 fw-bold">Email</p>
                    <p className="mb-0 text-muted">Walstarappdev@gmail.com</p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <FaPhoneAlt className="me-3 mt-1 text-primary" size={18} />
                  <div>
                    <p className="mb-1 fw-bold">Phone</p>
                    <p className="mb-0 text-muted">+91 8530111646</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
