import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/job/getAll") 
      .then((res) => {setJobs(res.data); console.log(res.data)})
      .catch((err) => console.error("Error fetching job:", err));
  }, []);

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this company?")) {
    axios
      .delete(`http://localhost:8080/api/job/delete/${id}`)
      .then(() => {
        setJobs(jobs.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Error deleting company:", err));
  }
};




const handleEdit = (id) => {
  navigate(`/job-form/${id}`);
};


  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Job List</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success mb-3" onClick={() => navigate('/job-form')}> Post New job</button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Title</th>
            <th>Job Type</th>
            <th>Salary</th>
            <th>Skills</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                 <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(job.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{job.title}</td>
                <td>{job.jobType}</td>
                <td>{job.salary}</td>
                <td>{job.skills}</td>
                <td>
                  <a href={job.location} target="_blank" rel="noopener noreferrer">
                    {job.location}
                  </a>
                </td>
                <td>{job.description}</td>
               
              </tr> 
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No job found.
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    </div>
  );
}

export default JobList;
