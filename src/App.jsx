import React from "react";
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
import { CgProfile } from "react-icons/cg";
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

const SidebarLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className="mb-3">
      <Link
        to={to}
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

  console.log("role_id ------------------->", role_id);

  const getActiveIndex = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/dashboard":
        return 1;
      case "/user":
        return 2;
      case "/revenue":
        return 3;
      case "/add-admin":
        return 4;
      case "/manage-plans":
        return 5;
      case "/profile":
        return 6;
      case "/list-users":
        return 7;
      default:
        return -1;
    }
  };

  const activeIndex = getActiveIndex();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
        background: "#f8fafc",
      }}
    >
      {location.pathname !== "/" &&
        location.pathname !== "/contact" &&
        location.pathname !== "/login" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/privacy-policy" && (
          <aside
            className="p-3"
            style={{
              minWidth: "280px",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
              position: "relative",
              overflow: "hidden",
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
                className="d-flex align-items-center mb-4 p-2 rounded-3"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  gap: "12px",
                }}
              >
                <div
                  className="p-1 rounded-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <img src={logo} alt="Logo" width="30" />
                </div>
                <div>
                  <h5
                    className="mb-0 text-white"
                    style={{
                      fontSize: "20px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    Team Trackify
                  </h5>
                  <small
                    className="text-white text-opacity-75"
                    style={{ fontSize: "11px" }}
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
                      />
                      <SidebarLink
                        to="/user"
                        icon={HiUsers}
                        label="Organization Details"
                      />
                      <SidebarLink
                        to="/revenue"
                        icon={BsFileEarmarkBarGraphFill}
                        label="Revenue Analytics"
                      />
                      <SidebarLink
                        to="/manage-plans"
                        icon={RiVerifiedBadgeFill}
                        label="Plan Management"
                      />
                      <SidebarLink
                        to="/profile"
                        icon={CgProfile}
                        label="Profile Settings"
                      />
                    </>
                  )}
                  {role_id === 1 && (
                    <>
                      <SidebarLink
                        to="/admindashboard"
                        icon={MdDashboard}
                        label="Admin Dashboard"
                      />
                      <SidebarLink
                        to="/user"
                        icon={HiUsers}
                        label="User Management"
                      />
                      <SidebarLink
                        to="/payment-plans"
                        icon={RiVerifiedBadgeFill}
                        label="Payment Plans"
                      />
                      <SidebarLink
                        to="/transactionhistory"
                        icon={RiVerifiedBadgeFill}
                        label="Transaction History"
                      />
                      <SidebarLink
                        to="/profile"
                        icon={CgProfile}
                        label="Profile Settings"
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
        }}
      >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-forgot-password/:token" element={<ResetForgotPassword />} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
