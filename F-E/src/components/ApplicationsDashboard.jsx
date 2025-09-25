import React from "react";

const ApplicationsDashboard = ({ applications }) => {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Job Applications</h2>

      {applications.length === 0 && <p>No applications submitted yet.</p>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Skills</th>
            <th>Resume</th>
            <th>Cover Letter</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.fullName}</td>
              <td>{app.email}</td>
              <td>{app.phone}</td>
              <td>{app.skills.join(", ")}</td>
              <td>{app.resumeFile ? app.resumeFile.name : "N/A"}</td>
              <td>{app.coverLetter || "N/A"}</td>
              <td>{new Date(app.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsDashboard;
