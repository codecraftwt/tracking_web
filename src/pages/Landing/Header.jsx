import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../../../src/assets/Images/logo333.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          .nav-link-hover {
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          .nav-link-hover:hover {
            background-color: rgba(255, 255, 255, 0.2);
            color: #ffffff !important;
          }

          .login-button {
            background-color: white;
            color: #2563EB; /* blue text */
            font-weight: 500;
            border-radius: 0.375rem; /* rounded */
            transition: background-color 0.3s ease, color 0.3s ease;
            cursor: pointer;
            border: none;
          }
          .login-button:hover {
            background-color: #e2e8f0; /* light gray on hover */
            color: #1e40af; /* darker blue */
          }
        `}
      </style>

      <Navbar
        expand="lg"
        className="py-3 shadow-sm sticky-top"
        style={{
          background: "linear-gradient(135deg, #4A90E2, #2563EB)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Container>
          <Navbar.Brand
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="mainlogo"
              style={{
                height: "40px",
                marginRight: "10px",
              }}
            />
            <span className="text-white fw-bold fs-5">Team Trackify</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
            <span className="navbar-toggler-icon text-white"></span>
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="align-items-center gap-2 gap-lg-3">
              <Nav.Link
                className="nav-link-hover text-white fw-medium px-3 py-2 rounded"
                onClick={() => navigate("/")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="nav-link-hover text-white fw-medium px-3 py-2 rounded"
                onClick={() => navigate("/contact")}
              >
                Contact
              </Nav.Link>
              <Nav.Link
                className="login-button px-4 mx-2 rounded-pill"
                onClick={() => navigate("/login")}
              >
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
