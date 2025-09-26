import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Table, Badge, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const AdminDashboard = () => {
  const { token } = useContext(AuthContext) ?? localStorage.getItem("accessToken");

  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // metrics
    axios
      .get("http://localhost:8080/api/admin/metrics", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error(err));

    // latest applications
    axios
      .get("http://localhost:8080/api/admin/latest-applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecentApplications(res.data))
      .catch((err) => console.error(err));

    // latest users
    axios
      .get("http://localhost:8080/api/admin/latest-users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecentUsers(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>

      {/* Top Metrics */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Users</h5>
            <h3>{metrics.totalUsers}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Recruiters</h5>
            <h3>{metrics.totalRecruiters}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Jobs</h5>
            <h3>{metrics.totalJobs}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Applications</h5>
            <h3>{metrics.totalApplications}</h3>
          </Card>
        </Col>
      </Row>

      {/* Latest Users */}
      <h4 className="mt-4 mb-3">Recent Users</h4>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.user}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button size="sm" variant="outline-danger">
                  Deactivate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Latest Applications */}
      <h4 className="mt-4 mb-3">Recent Applications</h4>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {recentApplications.map((app) => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.jobTitle}</td>
              <td>
                <Badge
                  bg={
                    app.status === "Hired"
                      ? "success"
                      : app.status === "Rejected"
                      ? "danger"
                      : "info"
                  }
                >
                  {app.status}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="link"
                  href={`http://localhost:8080/api/applicants/${app.id}/resume`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
