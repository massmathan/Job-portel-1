import React, { useContext,useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from '../../AuthContext/AuthContext';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
const { token } = useContext(AuthContext) ?? localStorage.getItem('accessToken');

 useEffect(() => {
  axios
    .get("http://localhost:8080/api/job/getAll", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log(res.data); 
      setJobs(res.data);     
    })
    .catch(err => console.error(err));
}, [token]);

  return (
 <div className="container py-5">
  <h2 className="mb-4 text-center fw-bold">Available Jobs</h2>
  <div className="row">
    {jobs.map(job => (
      <div className="col-md-* col-lg-* mb-5" key={job.id}>
        <Card className="h-100 job-ticket shadow-sm border-0 position-relative">
          <div className="ticket-header p-3 shadow bg-light  rounded-top">
            <Card.Title className="mb-1 fw-bold ">{job.title}</Card.Title>
            <Card.Subtitle>{job.jobType} | {job.location}</Card.Subtitle>
          </div>
          
          <Card.Body className="mb-5">
            <Card.Text className="mb-2 text-truncate ">
              {job.description}
            </Card.Text>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Badge bg="info p-2">{job.jobType}</Badge>
              <Badge bg="secondary ">{job.location}</Badge>
            </div>

            <Card.Text className="fw-semibold mb-3">
              <strong>Salary:</strong> ${job.salary?.toLocaleString()}
            </Card.Text>

            <Link to={`/jobs/${job.id}`}>
              <Button variant="primary" className="w-100">View & Apply</Button>
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
