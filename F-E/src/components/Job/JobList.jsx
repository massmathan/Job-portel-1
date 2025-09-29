import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    company: "",
    jobType: "",
    salary: "",
    postingDate: "",
  });

  const { token } = useContext(AuthContext) ?? localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/job/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  // Filter jobs based on filters state
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location === "" ||
        job.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.company === "" ||
        job.company?.toLowerCase().includes(filters.company.toLowerCase())) &&
      (filters.jobType === "" ||
        job.jobType?.toLowerCase() === filters.jobType.toLowerCase()) &&
      (filters.salary === "" || job.salary >= parseInt(filters.salary)) &&
      (filters.postingDate === "" ||
        new Date(job.postingDate) >= new Date(filters.postingDate))
    );
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">Available Jobs</h2>

      {/* Filters */}
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Filter by location"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Filter by company"
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={filters.jobType}
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
            >
              <option value="">All Job Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Min Salary"
              value={filters.salary}
              onChange={(e) =>
                setFilters({ ...filters, salary: e.target.value })
              }
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              value={filters.postingDate}
              onChange={(e) =>
                setFilters({ ...filters, postingDate: e.target.value })
              }
            />
          </Col>
        </Row>
      </Form>

      <div className="row">
        {filteredJobs.length === 0 && (
          <p className="text-center">No jobs match your filters</p>
        )}
        {filteredJobs.map((job) => (
          <div className="col-md-* mb-4" key={job.id}>
            <Card className="h-100 shadow-sm border-secondary position-relative">
              <div className="ticket-header p-3 shadow bg-light rounded-top">
                <Card.Title className="mb-1 fw-bold text-capitalize">
                  {job.title}
                </Card.Title>
                <Card.Subtitle className="text-capitalize">
                  {job.jobType} | {job.location}
                </Card.Subtitle>
              </div>

              <Card.Body className="mb-5">
                <Card.Text className="mb-2 text-truncate text-capitalize">
                  {job.description}
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge bg="info p-2 text-uppercase">{job.jobType}</Badge>
                  <Badge bg="secondary text-capitalize p-3 fw-bold">
                    <strong className="text-uppercase">location -</strong>{" "}
                    {job.location}
                  </Badge>
                </div>

                <Card.Text className="fw-semibold mb-3 text-capitalize">
                  <strong>Salary:</strong> ${job.salary?.toLocaleString()}
                </Card.Text>

                <Link
                  to={`/apply`}
                  className="text-decoration-none d-flex justify-content-center"
                >
                  <Button variant="secondary" className="w-100 text-capitalize">
                    View & Apply
                  </Button>
                </Link>
              </Card.Body>

              <div className="ticket-footer position-absolute bottom-0 start-0 w-100 bg-light text-center py-2 rounded-bottom">
                Posted on: {new Date(job.postingDate).toLocaleDateString()}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
