import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Table, Badge, Form, Pagination } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const ApplicantDashboard = () => {
  const context = useContext(AuthContext);
  const token = context?.token || localStorage.getItem("accessToken");

  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    interviewsScheduled: 0,
    offers: 0,
    rejections: 0,
  });

  const [applications, setApplications] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get("http://localhost:8080/api/applicants/metrics", { headers })
      .then(res => setMetrics(res.data))
      .catch(err => console.error(err));

    axios
      .get("http://localhost:8080/api/applicants/all", { headers })
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, [token]);

  // Calculate pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentApplications = applications.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(applications.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Applicant Dashboard</h2>

      {/* Metrics Cards */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <h6>Total Applications</h6>
            <h3>{metrics.totalApplications}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <h6>Interviews Scheduled</h6>
            <h3>{metrics.interviewsScheduled}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <h6>Offers</h6>
            <h3>{metrics.offers}</h3>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3 shadow-sm">
            <h6>Rejections</h6>
            <h3>{metrics.rejections}</h3>
          </Card>
        </Col>
      </Row>

     

      {/* Applications Table */}
      <h4 className="mt-2 mb-3">My Applications</h4>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Interview Date</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No applications found.</td>
            </tr>
          ) : (
            currentApplications.map(app => (
              <tr key={app.id}>
                <td>{app.jobTitle}</td>
                <td>{app.job?.companies?.companyName || "-"}</td>
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
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
           {/* Rows per page selector */}
      {/* <Row className="mb-2 align-items-center"> */}
        <Col sm={2} className="me-2">
          <Form.Select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset page when rows change
            }}
          >
            {[5, 10, 20, 50].map(num => (
              <option key={num} value={num}>{num} rows</option>
            ))}
          </Form.Select>
        </Col>
      {/* </Row> */}
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      )}
    </div>
  );
};

export default ApplicantDashboard;
