import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Placeholder } from "react-bootstrap";

const RegisterAdmin = () => {
  const location = useLocation();
  const editingUser = location.state?.user || null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    userType: "standard",
    profileImage: null,
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        fullName: editingUser.name,
        email: editingUser.email,
        password: "",
        confirmPassword: "",
        mobile: "",
        address: "",
        userType: "standard",
        profileImage: null,
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar pageTitle={editingUser ? "Edit Admin" : "Add New Admin"} />
      <main className="container py-4">
        <section>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8">
              <div className="shadow-sm p-4 rounded">
                <h4 className="text-center mb-3 text-primary">
                  {editingUser ? "Edit Admin Details" : "Register New Admin"}
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
                            name="userType"
                            value={status.toLowerCase()}
                            checked={formData.userType === status.toLowerCase()}
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profileImage: e.target.files[0],
                        })
                      }
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mt-2">
                    {editingUser ? "Update Admin" : "Register Admin"}
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
