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
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import "./App.css";
import User from "./pages/Users/User.jsx";
import PhotoVerification from "./pages/PhotoVerification/PhotoVerification.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import TodaysActiveUsers from "./pages/TodaysActiveUsers/TodaysActiveUsers.jsx";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Login from "./pages/Authintication/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import { CgProfile } from "react-icons/cg";
import Listusers from "./pages/Users/Listusers.jsx";

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
      case "/report":
        return 3;
      case "/todays-active-users":
        return 4;
      case "/photo-verification":
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
                  to="/report"
                  icon={BsFileEarmarkBarGraphFill}
                  label="Revenue Details"
                />
                <SidebarLink
                  to="/todays-active-users"
                  icon={HiUsers}
                  label="Add New Admins"
                />
                <SidebarLink
                  to="/photo-verification"
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
          <Route path="/photo-verification" element={<PhotoVerification />} />
          <Route path="/todays-active-users" element={<TodaysActiveUsers />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
            <Route path="/listusers" element={<Listusers />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
