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
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { FiHome, FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";
import logo333 from "../../../src/assets/Images/logo333.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../redux/slices/contactSlice";
import Footer from "../Landing/Footer";
import Header from "../Landing/Header";

const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);

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
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const contactData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      await dispatch(createContact(contactData));
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field when it loses focus
    if (touched[name]) {
      validateForm();
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateForm();
  };

  // Reset form on successful submission
  useEffect(() => {
    if (success) {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setTouched({
        name: false,
        email: false,
        message: false,
      });
    }
  }, [success]);

  return (
    <div className="min-vh-100 bg-light">
      {/* Modern Navbar */}
      <Header />

      <Container className="py-5 py-lg-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h1 className="fs-1 mb-3 fw-semi-bold">Contact Us</h1>
          <p className="lead text-muted">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <Row className="g-4 justify-content-center">
          {/* Contact Info Section */}
          <Col lg={5} className="order-lg-1 order-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div
                  className="py-4 px-4 text-white"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                  }}
                >
                  <h3 className="fw-bold mb-0 fs-5">Contact Information</h3>
                </div>
                <Card.Body className="p-4 p-lg-5">
                  <div className="d-flex gap-4 mb-4">
                    <div
                      className="bg-primary bg-opacity-10 p-3 rounded-3 d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <FaMapMarkerAlt className="text-primary" size={20} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2 fs-6">Address</h5>
                      <p className="text-muted mb-0">
                        1 Rukmini Nagar, Front Of Datta Mandir, <br />
                        2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-4 mb-4">
                    <div
                      className="bg-primary bg-opacity-10 p-3 rounded-3 d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <FaEnvelope className="text-primary" size={20} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2 fs-6">Email</h5>
                      <p className="text-muted mb-0">Walstarappdev@gmail.com</p>
                    </div>
                  </div>

                  <div className="d-flex gap-4">
                    <div
                      className="bg-primary bg-opacity-10 p-3 rounded-3 d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <FaPhoneAlt className="text-primary" size={20} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2 fs-6">Phone</h5>
                      <p className="text-muted mb-0">+91 8530111646</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Form Section */}
          <Col lg={7} className="order-lg-2 order-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div
                  className="py-4 px-4 text-white"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                  }}
                >
                  <h3 className="fw-bold mb-0 fs-5">Send Us a Message</h3>
                </div>
                <Card.Body className="p-4 p-lg-5">
                  {success && (
                    <Alert variant="success" className="mb-4">
                      Thank you for your message! We'll get back to you soon.
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      {error.message || "An error occurred. Please try again."}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold fs-6">
                        Your Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your name"
                        className={`py-3 ${
                          formErrors.name && touched.name ? "is-invalid" : ""
                        }`}
                      />
                      {formErrors.name && touched.name && (
                        <div className="invalid-feedback">
                          {formErrors.name}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold fs-6">
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                        className={`py-3 ${
                          formErrors.email && touched.email ? "is-invalid" : ""
                        }`}
                      />
                      {formErrors.email && touched.email && (
                        <div className="invalid-feedback">
                          {formErrors.email}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold fs-6">
                        Your Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Write your message here..."
                        className={`${
                          formErrors.message && touched.message
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formErrors.message && touched.message && (
                        <div className="invalid-feedback">
                          {formErrors.message}
                        </div>
                      )}
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-3 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane /> Send Message
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Contact;
