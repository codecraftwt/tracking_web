import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-center mb-5">Privacy Policy</h1>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Row>
                <Col>
                  <section className="mb-5">
                    <h2 className="h4 mb-4">1. Information We Collect</h2>
                    <h3 className="h5 mb-3">a. Personal Information:</h3>
                    <p>We may collect the following personal information:</p>
                    <ul>
                      <li>Name</li>
                      <li>Contact information (e.g., phone number, email address)</li>
                      <li>Device information (e.g., device ID, operating system)</li>
                    </ul>

                    <h3 className="h5 mb-3">b. Location Data:</h3>
                    <p>
                      The App collects real-time location data to monitor delivery routes and ensure efficient product delivery. 
                      Location data is collected only during active delivery sessions and is used for operational purposes.
                    </p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 mb-4">2. How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                      <li>Monitor and optimize delivery routes</li>
                      <li>Ensure timely product deliveries</li>
                      <li>Enhance operational efficiency</li>
                      <li>Maintain records for compliance and auditing purposes</li>
                    </ul>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 mb-4">3. Data Sharing and Disclosure</h2>
                    <p>We do not sell or rent your personal information. We may share your information with:</p>
                    <ul>
                      <li><strong>Authorized Personnel:</strong> Access is limited to authorized employees who require the information for operational purposes.</li>
                      <li><strong>Service Providers:</strong> Third-party vendors who assist in app functionality, subject to confidentiality agreements.</li>
                      <li><strong>Legal Requirements:</strong> If required by law or in response to valid legal processes.</li>
                    </ul>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 mb-4">4. Data Security</h2>
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal information 
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 mb-4">5. Data Retention</h2>
                    <p>
                      We retain your personal information only for as long as necessary to fulfill the purposes outlined 
                      in this Privacy Policy or as required by law.
                    </p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 mb-4">6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                      <li>Access the personal information we hold about you</li>
                      <li>Request correction of inaccurate or incomplete data</li>
                      <li>Request deletion of your personal information, subject to legal obligations</li>
                    </ul>
                    <p>To exercise these rights, please contact us at walstarappdev@gmail.com.</p>
                  </section>

                  <section className="mb-5">
                    <h2 className="h4 mb-4">7. Changes to This Privacy Policy</h2>
                    <p>
                      We may update this Privacy Policy from time to time. We will notify you of any changes by updating 
                      the "Effective Date" at the top of this policy. We encourage you to review this policy periodically.
                    </p>
                  </section>

                  <section>
                    <h2 className="h4 mb-4">8. Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
                    <p>Email: <a href="mailto:walstarappdev@gmail.com">walstarappdev@gmail.com</a></p>
                  </section>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy; 