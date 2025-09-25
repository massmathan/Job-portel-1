import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    notifications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings submitted:", formData);
    // Call API to save settings here
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="col-md-6 col-lg-5 p-4 border rounded shadow-sm bg-light">
        <h2 className="text-center mb-4">Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="notifications" className="form-check-label">
              Enable Notifications
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsForm;
