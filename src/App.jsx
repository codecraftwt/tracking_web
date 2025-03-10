import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import User from "./pages/Users/User.jsx";
import Reports from "./pages/Reports/Revenue.jsx";
import Login from "./pages/Authintication/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Listusers from "./pages/Users/Listusers.jsx";
import ManagePlans from "./pages/Plans/ManagePlans.jsx";
import RegisterAdmin from "./pages/TodaysActiveUsers/RegisterAdmin.jsx";

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
        {/* {badge && (
          <span
            className="ms-auto"
            style={{
              backgroundColor: isActive ? "#192233" : "#fff",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              zIndex: 999,
              marginRight: 15,
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {badge}
          </span>
        )} */}
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
      case "/listusers":
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
                style={{ fontSize: "24px", fontFamily: "Poppins, sans-serif" }}
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
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/manage-plans" element={<ManagePlans />} />
          <Route path="/add-admin" element={<RegisterAdmin />} />
          <Route path="/revenue" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listusers" element={<Listusers />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
