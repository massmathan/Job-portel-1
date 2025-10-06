import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Table, Badge, Form, Pagination ,Button} from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const ApplicantDashboard = () => {
  const context = useContext(AuthContext);
  const token = context?.token || localStorage.getItem("accessToken");
    const itemsPerPage = 5;
  const [applications, setApplications] = useState([]);

  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    interviewsScheduled: 0,
    offers: 0,
    rejections: 0,
  });


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

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentApplications = applications.slice(indexOfFirst, indexOfLast);
   const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApps = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-center">Applicant Dashboard</h2>


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

 
      
    <div className="d-flex justify-content-center mt-3">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
