import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import {
  AiOutlineCloseCircle,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineCamera,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { registerUser, updateUser } from "../../redux/slices/userSlice";
import { div } from "framer-motion/client";

const RegisterAdmin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userDataa = JSON.parse(localStorage.getItem("user"));
  const role_id = userDataa?.role_id;

  const editingUser = location.state?.user || null;
  const profileEditing = location.state?.profileEditing || false;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    status: "active",
    avtar: null,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const userData = useSelector((state) => state.UserData.userInfo);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        fullName: editingUser.name,
        email: editingUser.email,
        mobile: editingUser.mobile_no,
        address: editingUser.address,
        status: editingUser?.isActive ? "active" : "inactive",
        avtar: null,
      });

      if (editingUser.avtar) {
        setPreviewImage(editingUser.avtar);
      }
    }
  }, [editingUser]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 3) error = "Name must be at least 3 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!editingUser) {
          if (!value.trim()) error = "Password is required";
          else if (value.length < 6)
            error = "Password must be at least 6 characters";
        }
        break;
      case "confirmPassword":
        if (!editingUser) {
          if (!value.trim()) error = "Please confirm password";
          else if (value !== formData.password) error = "Passwords don't match";
        }
        break;
      case "mobile":
        if (!value.trim()) error = "Mobile number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Invalid mobile number (10 digits required)";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, avtar: "File size should be less than 5MB" });
        return;
      }
      setErrors({ ...errors, avtar: "" });
      setFormData({ ...formData, avtar: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, avtar: null });
    setPreviewImage(null);
    setErrors({ ...errors, avtar: "" });
  };

  const getRoleBasedLabel = (label) => {
    if (role_id === 1) {
      return label.replace("Admin", "User");
    }
    return label;
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      mobile: validateField("mobile", formData.mobile),
      address: validateField("address", formData.address),
    };

    if (!editingUser) {
      newErrors.password = validateField("password", formData.password);
      newErrors.confirmPassword = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("createdby", userData._id);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("isActive", formData.status === "active" ? true : false);
    if (editingUser) {
      payload.append("role_id", editingUser.role_id);
    } else {
      payload.append("role_id", role_id === 2 ? 1 : 0);
    }

    if (formData.avtar) {
      payload.append("avtar", formData.avtar);
    }

    try {
      if (editingUser) {
        await dispatch(
          updateUser({ userId: editingUser._id, formData: payload })
        ).unwrap();
      } else {
        payload.append("password", formData.password);
        payload.append("confirmPassword", formData.confirmPassword);
        await dispatch(registerUser(payload)).unwrap();
      }
      if (profileEditing) {
        navigate("/profile");
      } else {
        navigate("/user");
      }
    } catch (error) {
      // Handle API errors here
      if (error.response && error.response.data) {
        const apiErrors = error.response.data;
        // You can map API errors to form fields here
      }
    }
  };

  return (
    <div className="bg-white min-vh-100">
      <Navbar
        pageTitle={
          editingUser
            ? getRoleBasedLabel("Edit Admin")
            : getRoleBasedLabel("Add New Admin")
        }
      />
      <main className="container py-5">
        <section>
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div
                className="card shadow border-0"
                style={{ borderRadius: "15px" }}
              >
                <div
                  className="card-header bg-primary text-white text-center py-4"
                  style={{ borderRadius: "15px 15px 0 0" }}
                >
                  <h4 className="mb-0 fw-bold" style={{ fontSize: "1.2rem" }}>
                    <AiOutlineUser className="me-2" />
                    {editingUser
                      ? getRoleBasedLabel("Edit Admin Details")
                      : getRoleBasedLabel("Register New Admin")}
                  </h4>
                </div>

                <div className="card-body p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/* Full Name */}
                      <div className="col-md-6 mb-4">
                        <div className="form-group">
                          <label
                            className="form-label fw-semibold text-dark mb-2"
                            style={{ fontSize: "0.9rem" }}
                          >
                            <AiOutlineUser className="me-2 text-primary" />
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            className={`form-control form-control-sm ${
                              errors.fullName ? "is-invalid" : ""
                            }`}
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            style={{
                              borderRadius: "8px",
                              border: "1px solid #e0e0e0",
                            }}
                          />
                          {errors.fullName && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <AiOutlineExclamationCircle className="me-1" />
                              {errors.fullName}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-md-6 mb-4">
                        <div className="form-group">
                          <label className="form-label fw-semibold text-dark mb-2">
                            <AiOutlineMail className="me-2 text-primary" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            className={`form-control form-control-sm ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            style={{
                              borderRadius: "8px",
                              border: "1px solid #e0e0e0",
                            }}
                          />
                          {errors.email && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <AiOutlineExclamationCircle className="me-1" />
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Password Fields - Only show if not editing */}
                    {!editingUser && (
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-group">
                            <label className="form-label fw-semibold text-dark mb-2">
                              <AiOutlineLock className="me-2 text-primary" />
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              className={`form-control form-control-sm ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              placeholder="Enter password"
                              value={formData.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              style={{
                                borderRadius: "8px",
                                border: "1px solid #e0e0e0",
                              }}
                            />
                            {errors.password && (
                              <div className="invalid-feedback d-flex align-items-center">
                                <AiOutlineExclamationCircle className="me-1" />
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <div className="form-group">
                            <label className="form-label fw-semibold text-dark mb-2">
                              <AiOutlineLock className="me-2 text-primary" />
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              className={`form-control form-control-sm ${
                                errors.confirmPassword ? "is-invalid" : ""
                              }`}
                              placeholder="Confirm password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              style={{
                                borderRadius: "8px",
                                border: "1px solid #e0e0e0",
                              }}
                            />
                            {errors.confirmPassword && (
                              <div className="invalid-feedback d-flex align-items-center">
                                <AiOutlineExclamationCircle className="me-1" />
                                {errors.confirmPassword}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row">
                      {/* Mobile Number */}
                      <div className="col-md-6 mb-4">
                        <div className="form-group">
                          <label className="form-label fw-semibold text-dark mb-2">
                            <AiOutlinePhone className="me-2 text-primary" />
                            Mobile Number
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            className={`form-control form-control-sm ${
                              errors.mobile ? "is-invalid" : ""
                            }`}
                            placeholder="Enter mobile number"
                            value={formData.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            style={{
                              borderRadius: "8px",
                              border: "1px solid #e0e0e0",
                            }}
                            min={0}
                          />
                          {errors.mobile && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <AiOutlineExclamationCircle className="me-1" />
                              {errors.mobile}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="col-md-6 mb-4">
                        <div className="form-group">
                          <label className="form-label fw-semibold text-dark mb-2">
                            <AiOutlineHome className="me-2 text-primary" />
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            className={`form-control form-control-sm ${
                              errors.address ? "is-invalid" : ""
                            }`}
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            style={{
                              borderRadius: "8px",
                              border: "1px solid #e0e0e0",
                            }}
                          />
                          {errors.address && (
                            <div className="invalid-feedback d-flex align-items-center">
                              <AiOutlineExclamationCircle className="me-1" />
                              {errors.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Section */}
                    {editingUser._id !== userDataa._id && (
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-dark mb-3">
                          Account Status
                        </label>
                        <div className="d-flex gap-4">
                          {[
                            {
                              value: "active",
                              label: "Active",
                              color: "success",
                            },
                            {
                              value: "inactive",
                              label: "Inactive",
                              color: "secondary",
                            },
                          ].map((status, index) => (
                            <div className="form-check" key={index}>
                              <input
                                type="radio"
                                name="status"
                                value={status.value}
                                checked={formData.status === status.value}
                                onChange={handleChange}
                                className="form-check-input"
                                style={{
                                  transform: "scale(1.3)",
                                  marginTop: "2px",
                                }}
                              />
                              <label className="form-check-label fw-medium ms-2">
                                <span
                                  className={`badge bg-${status.color} px-3 py-2`}
                                >
                                  {status.label}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Profile Photo Section */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold text-dark mb-3">
                        <AiOutlineCamera className="me-2 text-primary" />
                        Profile Photo
                      </label>

                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <input
                            type="file"
                            className={`form-control form-control-sm ${
                              errors.avtar ? "is-invalid" : ""
                            }`}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{
                              borderRadius: "8px",
                              border: "1px solid #e0e0e0",
                            }}
                          />
                          <div className="form-text text-muted mt-1">
                            Upload a profile picture (JPG, PNG, GIF up to 5MB)
                          </div>
                          {errors.avtar && (
                            <div className="text-danger small d-flex align-items-center mt-1">
                              <AiOutlineExclamationCircle className="me-1" />
                              {errors.avtar}
                            </div>
                          )}
                        </div>

                        {previewImage && (
                          <div className="col-md-4 text-center">
                            <div className="position-relative d-inline-block">
                              <img
                                src={previewImage}
                                alt="Profile Preview"
                                className="img-thumbnail"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                  border: "3px solid #007bff",
                                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute"
                                style={{
                                  top: "-8px",
                                  right: "-8px",
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                  padding: "0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={removeImage}
                              >
                                <AiOutlineCloseCircle />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid gap-2 mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm fw-bold"
                        style={{
                          borderRadius: "10px",
                          padding: "10px 20px",
                          fontSize: "0.95rem",
                          boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 6px 20px rgba(0, 123, 255, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 4px 15px rgba(0, 123, 255, 0.3)";
                        }}
                      >
                        {editingUser
                          ? getRoleBasedLabel("Update Admin")
                          : getRoleBasedLabel("Register Admin")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterAdmin;
