import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const JobCard = ({ job, handleSaveJob }) => {
  return (
    <Card
      className="h-100  shadow-lg border-0 job-card"
      style={{ borderRadius: "12px", transition: "transform 0.2s" }}
    >
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold mb-2">{job.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-3">
          {job.company} &bull; {job.location}
        </Card.Subtitle>
        <Card.Text
          className="text-truncate mb-3"
          style={{ maxHeight: "60px", overflow: "hidden" }}
        >
          {job.description}
        </Card.Text>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg="info">{job.jobType}</Badge>
          <Badge bg="secondary">${job.salary?.toLocaleString()}</Badge>
          {job.skills?.map((skill, idx) => (
            <Badge key={idx} bg="dark" className="text-white">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleSaveJob(job)}
          >
            Save Job
          </Button>
          <Link to={`/apply/${job.id}`}>
            <Button variant="primary" size="sm">
              Apply Now
            </Button>
          </Link>
        </div>
      </Card.Body>

      <Card.Footer className="text-center text-muted small">
        Posted on: {new Date(job.postingDate).toLocaleDateString()}
      </Card.Footer>

      <style jsx>{`
        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </Card>
  );
};

export default JobCard;
