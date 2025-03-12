import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({ handleClick, text = "Add Plan", icon: Icon }) => {
  return (
    <Button
      variant="primary"
      onClick={handleClick}
      style={{
        fontSize: "13px",
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "capitalize",
        fontWeight: "600",
      }}
    >
      {Icon && <Icon className="me-2" />} {text}
    </Button>
  );
};

export default CustomButton;
