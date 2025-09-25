import React, { useState } from "react";

const ApplicantForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeFile: null,
    coverLetter: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Applicant Submitted:", formData);
    alert("Application submitted successfully!");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      resumeFile: null,
      coverLetter: "",
      skills: "",
    });
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="col-md-6 p-4 border rounded shadow-sm bg-light">
        <h2 className="text-center mb-4">Job Application Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-3">
            <label>Resume</label>
            <input
              type="file"
              name="resumeFile"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="form-control"
              required
            />
            {formData.resumeFile && (
              <p className="mt-2">Selected File: {formData.resumeFile.name}</p>
            )}
          </div>

          <div className="mb-3">
            <label>Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="form-control"
              rows={4}
              placeholder="Write a short cover letter"
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., React, Node.js, CSS"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicantForm;
