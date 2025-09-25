import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('accessToken');``

  useEffect(() => {
    
    axios.get("http://localhost:8080/api/job/getAll",{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div className="container py-5">
      <h2>Available Jobs</h2>
      <div className="row">
        {jobs.map(job => (
          <div className="col-md-4 mb-3" key={job.id}>
            <Card>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>{job.description.substring(0, 100)}...</Card.Text>
                <Card.Text><strong>Location:</strong> {job.location}</Card.Text>
                <Card.Text><strong>Type:</strong> {job.jobType}</Card.Text>
                <Link to={`/jobs/${job.id}`}>
                  <Button variant="primary">View & Apply</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
