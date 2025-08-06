import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { CgProfile, CgMenu, CgClose } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import logo from "./assets/Images/logo31.png";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import User from "./pages/Users/User.jsx";
import Reports from "./pages/Reports/Revenue.jsx";
import Login from "./pages/Authintication/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Listusers from "./pages/Users/Listusers.jsx";
import ManagePlans from "./pages/Plans/ManagePlans.jsx";
import RegisterAdmin from "./pages/TodaysActiveUsers/RegisterAdmin.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./context/PrivateRoute.jsx";
import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
import PaymentPlans from "./pages/Plans/PaymentPlans.jsx";
import TranscationHistory from "./pages/Plans/TranscationHistory.jsx";
import TrackingData from "./pages/Users/TrackingData.jsx";
import Locations from "./pages/Users/Locations.jsx";
import Landing from "./pages/Landing/index.tsx";
import Contact from "./pages/Contact/index.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/index.tsx";
import ActiveUserLocations from "./pages/Users/ActiveUserLocations.jsx";
import ResetPassword from "./pages/Profile/ResetPassword.jsx";
import ForgotPassword from "./pages/Authintication/ForgotPassword.jsx";
import ResetForgotPassword from "./pages/Authintication/ResetForgotPassword.jsx";
import ContactList from "./pages/Contact/ContactList.jsx";
import { FaEnvelope } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import UserReport from "./pages/Reports/UserReport.jsx";

const SidebarLink = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className="mb-3">
      <Link
        to={to}
        onClick={onClick}
        className={`text-decoration-none d-flex align-items-center p-2 rounded-2 transition-all ${
          isActive ? "bg-white text-primary shadow-sm" : "text-white"
        }`}
        style={{
          gap: "10px",
          transition: "all 0.3s ease",
          border: isActive
            ? "1px solid rgba(59, 130, 246, 0.2)"
            : "1px solid transparent",
        }}
      >
        <div
          className={`p-1 rounded-2 ${
            isActive ? "bg-primary" : "bg-white bg-opacity-10"
          }`}
        >
          <Icon size={18} color={isActive ? "#fff" : "#fff"} />
        </div>
        <span
          style={{
            fontSize: "14px",
            fontWeight: isActive ? "600" : "500",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

const App = () => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("user"));
  const role_id = userData?.role_id;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      // Close sidebar when resizing to desktop if it was open
      if (window.innerWidth >= 992 && !sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    // Set initial state based on screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  const shouldShowSidebar =
    location.pathname !== "/" &&
    location.pathname !== "/contact" &&
    location.pathname !== "/login" &&
    location.pathname !== "/forgot-password" &&
    location.pathname !== "/reset-forgot-password" &&
    location.pathname !== "/privacy-policy";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
        background: "#f8fafc",
      }}
    >
      {/* Mobile Toggle Button */}
      {shouldShowSidebar && isMobile && (
        <button
          onClick={toggleSidebar}
          className="btn btn-secondary d-lg-none"
          style={{
            position: "fixed",
            top: "16px",
            left: "10px",
            zIndex: 1050,
            padding: "5px 10px",
          }}
        >
          {sidebarOpen ? <CgClose size={20} /> : <CgMenu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      {shouldShowSidebar && (
        <aside
          className={`p-3 ${sidebarOpen || !isMobile ? "d-flex" : "d-none"} ${
            isMobile ? "mobile-sidebar" : ""
          }`}
          style={{
            minWidth: "280px",
            width: isMobile ? "280px" : "auto",
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
            position: isMobile ? "fixed" : "relative",
            zIndex: 1040,
            overflowY: "auto",
            transform: isMobile
              ? sidebarOpen
                ? "translateX(0)"
                : "translateX(-100%)"
              : "none",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Logo Section */}
            <div
              className={`d-flex align-items-center mb-4 p-2 rounded-3`}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                gap: isMobile ? "8px" : "12px", // smaller gap on mobile
                flexDirection: isMobile ? "column" : "row", // stack vertically on mobile
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <div
                className="p-1 rounded-2"
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(5px)",
                }}
              >
                <img src={logo} alt="Logo" width={isMobile ? 40 : 30} />
              </div>
              <div>
                <h5
                  className="mb-0 text-white"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Team Trackify
                </h5>
                <small
                  className="text-white text-opacity-75"
                  style={{ fontSize: isMobile ? "14px" : "11px" }}
                >
                  Admin Panel
                </small>
              </div>
            </div>

            {/* Navigation */}
            <nav>
              <ul className="list-unstyled" style={{ marginTop: "25px" }}>
                {role_id === 2 && (
                  <>
                    <SidebarLink
                      to="/dashboard"
                      icon={MdDashboard}
                      label="Dashboard"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/user"
                      icon={HiUsers}
                      label="Organization Details"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/revenue"
                      icon={BsFileEarmarkBarGraphFill}
                      label="Revenue Analytics"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/manage-plans"
                      icon={RiVerifiedBadgeFill}
                      label="Plan Management"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/contact-list"
                      icon={FaEnvelope}
                      label="Contact List"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/profile"
                      icon={CgProfile}
                      label="Profile Settings"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                  </>
                )}
                {role_id === 1 && (
                  <>
                    <SidebarLink
                      to="/admindashboard"
                      icon={MdDashboard}
                      label="Admin Dashboard"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/user"
                      icon={HiUsers}
                      label="User Management"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/payment-plans"
                      icon={RiVerifiedBadgeFill}
                      label="Payment Plans"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/transactionhistory"
                      icon={RiVerifiedBadgeFill}
                      label="Transaction History"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/report"
                      icon={TbReportAnalytics}
                      label="Reports"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                    <SidebarLink
                      to="/profile"
                      icon={CgProfile}
                      label="Profile Settings"
                      onClick={() => isMobile && setSidebarOpen(false)}
                    />
                  </>
                )}
              </ul>
            </nav>
          </div>

          {/* Footer Section */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              className="p-2 rounded-3 text-center"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <small className="text-white text-opacity-75">
                © {new Date().getFullYear()} Team Trackify
              </small>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          background: "#f8fafc",
          // marginLeft: shouldShowSidebar && !isMobile ? "280px" : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Overlay for mobile when sidebar is open */}
        {isMobile && sidebarOpen && shouldShowSidebar && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1039,
            }}
            onClick={toggleSidebar}
          />
        )}

        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-forgot-password"
              element={<ResetForgotPassword />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute element={<Dashboard />} allowedRoles={[2]} />
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute element={<User />} allowedRoles={[2, 1]} />
              }
            />
            <Route
              path="/manage-plans"
              element={
                <PrivateRoute element={<ManagePlans />} allowedRoles={[2]} />
              }
            />
            <Route
              path="/add-admin"
              element={
                <PrivateRoute
                  element={<RegisterAdmin />}
                  allowedRoles={[2, 1]}
                />
              }
            />
            <Route
              path="/revenue"
              element={
                <PrivateRoute element={<Reports />} allowedRoles={[2]} />
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute element={<Profile />} allowedRoles={[2, 1]} />
              }
            />
            <Route
              path="/reset-password"
              element={
                <PrivateRoute
                  element={<ResetPassword />}
                  allowedRoles={[2, 1]}
                />
              }
            />
            <Route
              path="/list-users/:adminId"
              element={
                <PrivateRoute element={<Listusers />} allowedRoles={[2]} />
              }
            />
            <Route
              path="/admindashboard"
              element={
                <PrivateRoute element={<AdminDashboard />} allowedRoles={[1]} />
              }
            />
            <Route
              path="/payment-plans"
              element={
                <PrivateRoute element={<PaymentPlans />} allowedRoles={[1]} />
              }
            />
            <Route
              path="/transactionhistory"
              element={
                <PrivateRoute
                  element={<TranscationHistory />}
                  allowedRoles={[1]}
                />
              }
            />
            <Route
              path="/report"
              element={
                <PrivateRoute element={<UserReport />} allowedRoles={[1]} />
              }
            />
            <Route
              path="/trackingdata"
              element={
                <PrivateRoute
                  element={<TrackingData />}
                  allowedRoles={[1, 2]}
                />
              }
            />
            <Route
              path="/locations"
              element={
                <PrivateRoute element={<Locations />} allowedRoles={[1, 2]} />
              }
            />
            <Route
              path="/active-locations"
              element={
                <PrivateRoute
                  element={<ActiveUserLocations />}
                  allowedRoles={[1]}
                />
              }
            />
            <Route
              path="/contact-list"
              element={
                <PrivateRoute element={<ContactList />} allowedRoles={[2]} />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
