import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

function AnalyticsDashboard() {
  const [applicationsPerJob, setApplicationsPerJob] = useState([]);
  const [jobTrend, setJobTrend] = useState([]);
  const [timeToHire, setTimeToHire] = useState(0);


  const {auth, userId, role} = useContext(AuthContext);

  const token = auth?.token || localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = "http://localhost:8080/api/analytics";

        const urlParam = (role == 'ADMIN') ? 0 : userId ;
        console.log(" Mathan ",urlParam);
        const appsRes = await axios.get(
          `${API_BASE_URL}/applications-per-job/${urlParam}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplicationsPerJob(
          appsRes.data.map((d) => ({
            jobTitle: d.jobTitle,
            applications: d.applications,
          }))
        );

        const trendRes = await axios.get(
          `${API_BASE_URL}/job-trend/${urlParam}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobTrend(
          trendRes.data.map((d) => ({
            month: d.month,
            total: d.total,
          }))
        );

       const hireRes = await axios.get(
        `${API_BASE_URL}/time-to-hire/${urlParam}`,
        { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(hireRes.data);
        setTimeToHire(hireRes.data.averageTimeToHire);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Analytics Dashboard</h2>

      <Row className="mb-4">
  <Col>
    <Card className="p-3 shadow-sm text-center">
      <h5>Average Time to Hire</h5>
      <p className="fw-bold fs-4">
        {timeToHire && timeToHire.averageTimeToHire != null
          ? `${timeToHire.averageTimeToHire.toFixed(2)} days`
          : "Loading..."}
      </p>
    </Card>
  </Col>
</Row>

      <Row>
        <Col md={6}>
          <Card className="p-3 shadow-sm mb-4">
            <h5>Applications per Job</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationsPerJob}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jobTitle" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm mb-4">
            <h5>Job Posting Trend</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="p-3 shadow-sm">
            <h5>Raw Applications Data</h5>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Applications</th>
                </tr>
              </thead>
              <tbody>
                {applicationsPerJob.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.jobTitle}</td>
                    <td>{row.applications}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AnalyticsDashboard;
