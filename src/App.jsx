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
import logo from "./assets/Images/logo.png";
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

const SidebarLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li
      className={isActive ? "active-sidebar-item" : ""}
      style={{ marginBlock: 5, paddingBlock: 5 }}
    >
      <Link
        to={to}
        className="text-decoration-none d-flex align-items-center"
        style={{
          gap: "10px",
          backgroundColor: isActive ? "#fff" : "transparent",
          height: 44.6,
          padding: "10px",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
          marginRight: "-17px",
          paddingLeft: 15,
        }}
      >
        <Icon size={22} color={isActive ? "#192233" : "#fff"} />
        <span
          style={{
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Poppins, sans-serif",
            color: isActive ? "#000" : "#fff",
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
      }}
    >
      {location.pathname !== "/" && (
        <aside
          className="text-white p-3"
          style={{
            minWidth: "290px",
            backgroundColor: "#4A90E2",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              className="d-flex align-items-center mb-4"
              style={{ gap: "15px" }}
            >
              <img src={logo} alt="Logo" width="40" />
              <h4
                className="mb-0"
                style={{
                  fontSize: "24px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                }}
              >
                Trackify
              </h4>
            </div>

            <nav>
              <ul className="list-unstyled" style={{ marginTop: "120px" }}>
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
                      label="All organization's Details"
                    />
                    <SidebarLink
                      to="/revenue"
                      icon={BsFileEarmarkBarGraphFill}
                      label="Revenue Details"
                    />
                    {/* <SidebarLink
                      to="/add-admin"
                      icon={HiUsers}
                      label="Add New Admins"
                    /> */}
                    <SidebarLink
                      to="/manage-plans"
                      icon={RiVerifiedBadgeFill}
                      label="Manage Plans"
                    />
                    <SidebarLink
                      to="/profile"
                      icon={CgProfile}
                      label="Profile"
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
                      label="All Users Details"
                    />
                    {/* <SidebarLink
                      to="/add-admin"
                      icon={HiUsers}
                      label="Add New Users"
                    /> */}
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
                      label="Profile"
                    />
                  </>
                )}
              </ul>
            </nav>
          </div>
        </aside>
      )}

      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
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
                  allowedRoles={[1]}
                />
              }
            />
              <Route
              path="/locations"
              element={
                <PrivateRoute
                  element={<Locations />}
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
