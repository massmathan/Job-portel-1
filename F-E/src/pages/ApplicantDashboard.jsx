import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Table, Badge } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const ApplicantDashboard = () => {
  const { token } = useContext(AuthContext) ?? localStorage.getItem("accessToken");

  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    interviewsScheduled: 0,
    offers: 0,
    rejections: 0,
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/applicant/metrics", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMetrics(res.data))  
      .catch((err) => console.error(err));  

    axios
      .get("http://localhost:8080/api/applicant/applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Applicant Dashboard</h2>

      {/* Metrics */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Total Applications</h5>
            <h3>{metrics.totalApplications}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Interviews Scheduled</h5>
            <h3>{metrics.interviewsScheduled}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Offers</h5>
            <h3>{metrics.offers}</h3>
          </Card>
        </Col>
        <Col>
          <Card className="text-center p-3 shadow-sm">
            <h5>Rejections</h5>
            <h3>{metrics.rejections}</h3>
          </Card>
        </Col>
      </Row>

      {/* Application List */}
      <h4 className="mt-4 mb-3">My Applications</h4>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Interview Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.jobTitle}</td>
              <td>{app.company}</td>
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
              <td>{app.interviewDate ? new Date(app.interviewDate).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplicantDashboard;
