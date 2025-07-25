import React from "react";
import { Container, Row, Col, Card, Navbar, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiMail,
  FiClock,
  FiShield,
  FiUser,
  FiShare2,
} from "react-icons/fi";
import logo333 from "../../../src/assets/Images/logo333.png";
import { useNavigate } from "react-router-dom";
import Header from "../Landing/Header";
import Footer from "../Landing/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Policy sections with icons
  const policySections = [
    {
      title: "1. Information We Collect",
      icon: <FiUser className="text-primary" size={24} />,
      subsections: [
        {
          title: "a. Personal Information:",
          content: (
            <>
              <p>We may collect the following personal information:</p>
              <ul>
                <li>Name</li>
                <li>Contact information (e.g., phone number, email address)</li>
                <li>Device information (e.g., device ID, operating system)</li>
              </ul>
            </>
          ),
        },
        {
          title: "b. Location Data:",
          content: (
            <p>
              The App collects real-time location data to monitor delivery
              routes and ensure efficient product delivery. Location data is
              collected only during active delivery sessions and is used for
              operational purposes.
            </p>
          ),
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      icon: <FiShare2 className="text-primary" size={24} />,
      content: (
        <>
          <p>We use the collected information to:</p>
          <ul>
            <li>Monitor and optimize delivery routes</li>
            <li>Ensure timely product deliveries</li>
            <li>Enhance operational efficiency</li>
            <li>Maintain records for compliance and auditing purposes</li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Data Sharing and Disclosure",
      icon: <FiShield className="text-primary" size={24} />,
      content: (
        <>
          <p>
            We do not sell or rent your personal information. We may share your
            information with:
          </p>
          <ul>
            <li>
              <strong>Authorized Personnel:</strong> Access is limited to
              authorized employees who require the information for operational
              purposes.
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party vendors who assist
              in app functionality, subject to confidentiality agreements.
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required by law or in
              response to valid legal processes.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Data Security",
      icon: <FiShield className="text-primary" size={24} />,
      content: (
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>
      ),
    },
    {
      title: "5. Data Retention",
      icon: <FiClock className="text-primary" size={24} />,
      content: (
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy or as required by
          law.
        </p>
      ),
    },
    {
      title: "6. Your Rights",
      icon: <FiUser className="text-primary" size={24} />,
      content: (
        <>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>
              Request deletion of your personal information, subject to legal
              obligations
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at{" "}
            <a href="mailto:walstarappdev@gmail.com" className="text-primary">
              walstarappdev@gmail.com
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "7. Changes to This Privacy Policy",
      icon: <FiClock className="text-primary" size={24} />,
      content: (
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by updating the "Effective Date" at the top of this
          policy. We encourage you to review this policy periodically.
        </p>
      ),
    },
    {
      title: "8. Contact Us",
      icon: <FiMail className="text-primary" size={24} />,
      content: (
        <>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us:
          </p>
          <p>
            Email:{" "}
            <a href="mailto:walstarappdev@gmail.com" className="text-primary">
              walstarappdev@gmail.com
            </a>
          </p>
        </>
      ),
    },
  ];

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
          <h1 className="fw-bold display-6 mb-3">Privacy Policy</h1>
          <p className="lead text-muted">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <div
              className="py-4 px-4 text-white"
              style={{
                background: "linear-gradient(135deg, #2563EB, #1E40AF)",
              }}
            >
              <h2 className="fw-bold mb-0 h3">Your Privacy Matters</h2>
            </div>
            <Card.Body className="p-4 p-lg-5">
              {policySections.map((section, index) => (
                <motion.section
                  key={index}
                  className="mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-3">
                      {section.icon}
                    </div>
                    <h3 className="fw-bold mb-0 h4">{section.title}</h3>
                  </div>

                  {section.subsections ? (
                    section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="mb-4 ps-5">
                        <h4 className="fw-semibold mb-3 h5">
                          {subsection.title}
                        </h4>
                        <div className="text-muted">{subsection.content}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted ps-5">{section.content}</div>
                  )}
                </motion.section>
              ))}
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
