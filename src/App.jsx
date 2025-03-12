import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
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

const SidebarLink = ({ to, icon: Icon, label, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li
      style={{
        marginBlock: 5,
        paddingBlock: 5,
        position: "relative",
      }}
      className={isActive ? "active-sidebar-item" : ""}
    >
      <Link
        to={to}
        className="text-decoration-none d-flex align-items-center"
        style={{
          gap: "10px",
          backgroundColor: isActive ? "#fff" : "transparent",
          height: 44.6,
          padding: "10px",
          paddingRight: "0px",
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
            lineHeight: "24px",
            paddingLeft: 2,
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
              <img src="src/assets/Images/logo.png" alt="Logo" width="40" />
              <h4
  className="mb-0"
  style={{ fontSize: "24px", fontFamily: "'Poppins', sans-serif,fontWeight: 700" }}
>
  Trackify
</h4>
            </div>

            <nav>
              <ul className="list-unstyled" style={{ marginTop: "120px" }}>
                <SidebarLink
                  to="/dashboard"
                  icon={MdDashboard}
                  label="Dashboard"
                />
                <SidebarLink
                  to="/user"
                  icon={HiUsers}
                  label="All Admin's Details"
                />
                <SidebarLink
                  to="/revenue"
                  icon={BsFileEarmarkBarGraphFill}
                  label="Revenue Details"
                />
                <SidebarLink
                  to="/add-admin"
                  icon={HiUsers}
                  label="Add New Admins"
                />
                <SidebarLink
                  to="/manage-plans"
                  icon={RiVerifiedBadgeFill}
                  label="Manage Plans"
                />
                <SidebarLink to="/profile" icon={CgProfile} label="Profile" />
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
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route path="/user" element={<PrivateRoute element={<User />} />} />
            <Route
              path="/manage-plans"
              element={<PrivateRoute element={<ManagePlans />} />}
            />
            <Route
              path="/add-admin"
              element={<PrivateRoute element={<RegisterAdmin />} />}
            />
            <Route
              path="/revenue"
              element={<PrivateRoute element={<Reports />} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route
              path="/list-users/:adminId"
              element={<PrivateRoute element={<Listusers />} />}
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
