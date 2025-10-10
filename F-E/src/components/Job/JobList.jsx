import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import JobFilters from "./JobFilters";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    company: "",
    jobType: "",
    salary: "",
    postingDate: "",
  });
  // const { refreshTokens,refreshToken } = useAuthHelpers();

  const { token } = useContext(AuthContext) ?? { token: localStorage.getItem("accessToken") };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/job/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location === "" || job.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.company === "" || job.companies?.companyName.toLowerCase().includes(filters.company.toLowerCase())) &&
      (filters.jobType === "" || job.jobType?.toLowerCase() === filters.jobType.toLowerCase()) &&
      (filters.salary === "" || job.salary >= parseInt(filters.salary)) && 
      (filters.postingDate === "" || new Date(job.postingDate) <= new Date(filters.postingDate))
    );
  });

  const handleSaveJob = (job) => {
    if (!savedJobs.find((j) => j.id === job.id)) setSavedJobs([...savedJobs, job]);
  };

  return (
    <div className="container py-5 ">
      <h2 className="mb-4 text-center fw-bold">Available Jobs</h2>

      <JobFilters filters={filters} setFilters={setFilters} />

      <Row className="">
        {filteredJobs.length === 0 && <p className="text-center">No jobs match your filters</p>}
        {filteredJobs.map((job) => (
          <Col md={4} key={job.id} className="mb-4">
            <JobCard job={job} handleSaveJob={handleSaveJob} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobList;
