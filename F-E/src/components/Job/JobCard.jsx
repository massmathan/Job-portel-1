import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ job, handleSaveJob }) => {

    const navigate = useNavigate();

    console.log(job);
  
  function onViewDetails(id) {
  // alert(`Job ID: ${id}`);
  navigate(`/job-view/${id}`);
}


  return (
    <div
      className="job-card container w-100 border-0 p-4 rounded-4 shadow-sm bg-white"
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}


    >
      <div className="mb-3">
        <h3 className="fw-bold mb-1">{job?.title || "Untitled Job"}</h3>
        <p className="text-muted">
          <i className="bi bi-building me-1"></i>
          {job?.companies?.companyName || "Unknown Company"} &bull;{" "}
          <i className="bi bi-geo-alt me-1"></i>
          {job?.location || "Remote"}
        </p>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {job?.jobType && (
          <span className="badge bg-info text-dark">{job.jobType}</span>
        )}
        {job?.salary && (
          <span className="badge bg-secondary">
            ₹ {job.salary.toLocaleString()} Pre Month
          </span>
        )}
        {job?.experience && (
          <span className="badge bg-warning text-dark">
            {job.experience}+ yrs exp
          </span>
        )}
        {job?.postedBy && (
          <span className="badge bg-light text-dark border">
            Posted by {job.postedBy}
          </span>
        )}
      </div>

      <div className="mb-4">
        <h5 className="fw-bold mb-2">Job Description</h5>
        <p className="text-muted">{job?.description || "No description available."}</p>
      </div>

      {job?.responsibilities?.length > 0 && (
        <div className="mb-4">
          <h5 className="fw-bold mb-2">Responsibilities</h5>
          <ul className="text-muted">
            {job.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>
      )}

      {job?.skills?.length > 0 && (
        <div className="mb-4">
          <h5 className="fw-bold mb-2">Required Skills</h5>
          <div className="d-flex flex-wrap gap-2">
            {job.skills.map((skill, idx) => (
              <span key={idx} className="badge bg-light text-dark border">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* <button
          className="btn btn-outline-primary px-3"
          onClick={() => handleSaveJob(job)}
        >
          <i className="bi bi-heart me-1"></i> Save
        </button> */}
        <Button onClick={() => onViewDetails(job.id)}>View</Button>
        <Link to={`/apply/${job?.id || ""}`}>
          <button className="btn btn-primary px-3">
            <i className="bi bi-send me-1"></i> Apply Now
          </button>
        </Link>
      </div>

      <div className="text-muted small">
        <i className="bi bi-calendar-event me-1"></i>
        Posted on{" "}
        {job?.postingDate
          ? new Date(job.postingDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "N/A"}
      </div>

      <style>{`
        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default JobCard;
