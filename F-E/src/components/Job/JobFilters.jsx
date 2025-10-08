import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const JobFilters = ({ filters, setFilters }) => {
  return (
    <Form className="mb-4">
      <Row className="g-3">
        <Col md={3} >

         {/* <Form.Select  className="mb-3 p-3"  required>
                    <option value="">-- Select a job --</option>
                  </Form.Select> */}
          <Form.Control className="p-2"
            type="text"
            placeholder="Filter by location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <Form.Control className="p-2"
            type="text"
            placeholder="Filter by company"
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Form.Select className="p-2"
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control className="p-2"
            type="number"
            placeholder="Min Salary"
            value={filters.salary}
            onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Form.Control className="p-2" 
            type="date"
            value={filters.postingDate}
            onChange={(e) => setFilters({ ...filters, postingDate: e.target.value })}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default JobFilters;
