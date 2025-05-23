import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { registerUser, updateUser } from "../../redux/slices/userSlice";

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

  const [previewImage, setPreviewImage] = useState(null);
  const userData = useSelector((state) => state.UserData.userInfo);

  console.log(userData);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avtar: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, avtar: null });
    setPreviewImage(null);
  };

  const getRoleBasedLabel = (label) => {
    if (role_id === 1) {
      return label.replace("Admin", "User");
    }
    return label;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {}
  };

  return (
    <div className="bg-white min-vh-100">
      <Navbar pageTitle={editingUser ? getRoleBasedLabel("Edit Admin") : getRoleBasedLabel("Add New Admin")} />
      <main className="container py-4">
        <section>
          <div className="row justify-content-center formStyle">
            <div className="col-md-8 col-lg-8">
              <div className="shadow-sm p-4 rounded bg-light">
                <h4 className="text-center my-4 text-primary">
                  {editingUser ? getRoleBasedLabel("Edit Admin Details") : getRoleBasedLabel("Register New Admin")}
                </h4>
                <form onSubmit={handleSubmit}>
                  {[
                    {
                      label: "Full Name",
                      name: "fullName",
                      type: "text",
                      placeholder: "Enter a full name",
                    },
                    {
                      label: "Email",
                      name: "email",
                      type: "email",
                      placeholder: "Enter an email",
                    },
                    ...(editingUser
                      ? []
                      : [
                          {
                            label: "Password",
                            name: "password",
                            type: "password",
                            placeholder: "Enter a password",
                          },
                          {
                            label: "Confirm Password",
                            name: "confirmPassword",
                            type: "password",
                            placeholder: "Confirm password",
                          },
                        ]),
                    {
                      label: "Mobile Number",
                      name: "mobile",
                      type: "text",
                      placeholder: "Enter a mobile number",
                    },
                    {
                      label: "Address",
                      name: "address",
                      type: "text",
                      placeholder: "Enter an address",
                    },
                  ].map((field, index) => (
                    <div className="mb-3" key={index}>
                      <label className="form-label fw-bold">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="form-control"
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={
                          field.name !== "password" &&
                          field.name !== "confirmPassword"
                        }
                      />
                    </div>
                  ))}

                  <div className="mb-3">
                    <label className="form-label fw-bold">Status</label>
                    <div className="d-flex gap-3">
                      {["Active", "Inactive"].map((status, index) => (
                        <div className="form-check" key={index}>
                          <input
                            type="radio"
                            name="status"
                            value={status.toLowerCase()}
                            checked={formData.status === status.toLowerCase()}
                            onChange={handleChange}
                            className="form-check-input"
                          />
                          <label className="form-check-label">{status}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Profile Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>

                  {previewImage && (
                    <div className="mb-3 text-center position-relative d-inline-block">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginRight: "8px",
                        }}
                      />
                      <AiOutlineCloseCircle
                        className="position-absolute"
                        style={{
                          top: "-8px",
                          right: "-8px",
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "red",
                          background: "white",
                          borderRadius: "50%",
                        }}
                        onClick={removeImage}
                      />
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary w-100 mt-2">
                    {editingUser ? getRoleBasedLabel("Update Admin") : getRoleBasedLabel("Register Admin")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterAdmin;