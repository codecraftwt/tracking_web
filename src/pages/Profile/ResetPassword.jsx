import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.UserData);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    // Validate old password when it's touched
    if (touched.oldPassword) {
      validateField("oldPassword", form.oldPassword);
    }
  }, [form.oldPassword, touched.oldPassword]);

  useEffect(() => {
    // Validate new password when it's touched
    if (touched.newPassword) {
      validateField("newPassword", form.newPassword);
    }
  }, [form.newPassword, touched.newPassword]);

  useEffect(() => {
    // Validate confirm password when it's touched
    if (touched.confirmPassword) {
      validateField("confirmPassword", form.confirmPassword);
    }
  }, [form.confirmPassword, form.newPassword, touched.confirmPassword]);

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "oldPassword":
        if (!value) error = "Old password is required.";
        break;
      case "newPassword":
        if (!value) {
          error = "New password is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;
      case "confirmPassword":
        if (value !== form.newPassword) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });

    // If the field has been touched before, validate it
    if (touched[field]) {
      validateField(field, e.target.value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate all fields
    validateField("oldPassword", form.oldPassword);
    validateField("newPassword", form.newPassword);
    validateField("confirmPassword", form.confirmPassword);

    // Check if any errors exist
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched to show all possible errors
    setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (validateForm()) {
      // Make API call here
      dispatch(
        resetPassword({
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        })
      );
      navigate("/profile");
    }
  };

  return (
    <div
      className="profile-page"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(167, 191, 232, 0.1) 0%, rgba(211, 226, 243, 0.1) 90%)",
      }}
    >
      <Navbar pageTitle="Reset Password" />
      <Container className="py-4">
        <Card
          className="shadow-sm border-0 mx-auto"
          style={{
            maxWidth: "480px",
            borderRadius: "16px",
            background: "#ffffff",
            padding: "2rem",
            marginTop: "4rem",
          }}
        >
          <h3 className="text-center fw-bold mb-4 text-primary">
            Reset Password
          </h3>
          <Form onSubmit={handleSubmit}>
            {/* Old Password */}
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword.old ? "text" : "password"}
                  value={form.oldPassword}
                  placeholder="Enter old password"
                  onChange={(e) => handleChange(e, "oldPassword")}
                  onBlur={() => handleBlur("oldPassword")}
                  isInvalid={touched.oldPassword && !!errors.oldPassword}
                  className="pr-5"
                />
                <span
                  className="eye-icon"
                  onClick={() => toggleVisibility("old")}
                >
                  {showPassword.old ? <FaEyeSlash /> : <FaEye />}
                </span>
                <Form.Control.Feedback type="invalid">
                  {errors.oldPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword.new ? "text" : "password"}
                  value={form.newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => handleChange(e, "newPassword")}
                  onBlur={() => handleBlur("newPassword")}
                  isInvalid={touched.newPassword && !!errors.newPassword}
                  className="pr-5"
                />
                <span
                  className="eye-icon"
                  onClick={() => toggleVisibility("new")}
                >
                  {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                </span>
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4">
              <Form.Label>Repeat Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword.confirm ? "text" : "password"}
                  value={form.confirmPassword}
                  placeholder="Repeat new password"
                  onChange={(e) => handleChange(e, "confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                  className="pr-5"
                />
                <span
                  className="eye-icon"
                  onClick={() => toggleVisibility("confirm")}
                >
                  {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                </span>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 py-2 rounded-pill fw-bold"
              disabled={
                loading ||
                !form.oldPassword ||
                !form.newPassword ||
                !form.confirmPassword ||
                Object.values(errors).some((error) => error)
              }
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </Form>
        </Card>
      </Container>

      {/* Eye icon CSS */}
      <style jsx>{`
        .eye-icon {
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #6c757d;
          z-index: 2;
        }

        .form-control {
          padding-right: 2.5rem;
        }

        @media (max-width: 576px) {
          .reset-password-page {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
