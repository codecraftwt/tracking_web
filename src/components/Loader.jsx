import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ text = "Loading...", size = "lg" }) => {
  const loaderOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(1px)",
    height: "100vh",
  };

  const loaderContentStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  };

  return (
    <div style={loaderOverlayStyle}>
      <div style={loaderContentStyle}>
        <Spinner animation="border" variant="primary" size={size} />
        {/* <span className="ms-3">{text}</span> */}
      </div>
    </div>
  );
};

export default Loader;
