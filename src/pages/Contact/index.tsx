import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #4A90E2, #2563EB, #1E3A8A)',
        minHeight: '100vh',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Container>
        <h1 className="text-center mb-5 fw-bold">Contact Us</h1>

        <Row className="g-4">
          {/* Form Section */}
          <Col md={6} data-aos="fade-right">
            <Card className="h-100 shadow-lg border-0" style={{ backgroundColor: '#fff', color: '#000' }}>
              <Card.Body className="p-4">
                <h3 className="mb-4 fw-semibold text-center">Get in Touch</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 fw-semibold">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Info Section */}
          <Col md={6} data-aos="fade-left">
            <Card className="h-100 shadow-lg border-0" style={{ backgroundColor: '#fff', color: '#000' }}>
              <Card.Body className="p-4">
                <h3 className="mb-4 fw-semibold text-center">Contact Information</h3>
                <p className="mb-3">
                  <strong>Address:</strong><br />
                  1 Rukmini Nagar, Front Of Datta Mandir,<br />
                  2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005
                </p>
                <p className="mb-3">
                  <strong>Email:</strong><br />
                  Walstarappdev@gmail.com
                </p>
                <p className="mb-3">
                  <strong>Phone:</strong><br />
                  +91 8530111646
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
