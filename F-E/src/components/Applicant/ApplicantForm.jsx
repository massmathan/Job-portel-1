import React, { useState, useContext, useEffect } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { AuthContext } from "../../AuthContext/AuthContext";
import {  useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner ";
import ApiService from "../../Service/ApiService";

function ApplicantForm() {
  const [validated, setValidated] = useState(false);
  const { id } = useParams(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [recruiterId, setRecruiterId] = useState(0);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);
   const alertFlag = false ; 

  let { token } = useContext(AuthContext) ?? { token: localStorage.getItem("accessToken") };
    let { role } = useContext(AuthContext) ?? { token: localStorage.getItem("role") };


  const navigate = useNavigate();

   useEffect(() => {
           

    const fetchData = async () => {
      try {

        if (id) {
          const jobResponse = await ApiService.get(`/job/get/${id}`, {
            Authorization: `Bearer ${token}`,
          });
          console.log('job application',jobResponse.data);
          // const jobResponse = await axios.get(`http://localhost:8080/api/job/get/${id}`, {
          //   headers: { Authorization: `Bearer ${token}` },
          // });
          console.log(jobResponse.data);
          setRecruiters(jobResponse.data);
          setRecruiterId(jobResponse.data.recruiter.id); 
          const apiUrl = (role == 'USER')?"/applicants/":"/recruiter/";
          const recruiterResponse = await ApiService.get(`${apiUrl}${jobResponse.data.recruiter.id}`, 
            { Authorization: `Bearer ${token}` }
        );
          console.log("Recuriter data ",recruiterResponse.data);
          setRecruiters(recruiterResponse.data);
          setRecruiterId(Number(recruiterResponse.data.id)); 
        }

        const jobsResponse = await ApiService.get("/job/getAll", 
           { Authorization: `Bearer ${token}` }
        );
        console.log(jobsResponse);
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // alert("An error occurred while fetching data. Check console for details.");
      }
    };

    fetchData();
  }, [id, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("jobTitle", jobTitle);
    formData.append("jobId", jobId);
    formData.append("status", "applied");
    formData.append("recruiterId", recruiterId);

    try {
      console.log("form data",formData);
      const response = await ApiService.post("/applicants/apply", formData,
      {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });

      alert("Application submitted!");
      setName(""); setEmail(""); setResume(null); setJobTitle(""); setJobId(""); setRecruiterId("");
      navigate("/applicants-list");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Submission failed. Check console for error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-5 pb-5 d-flex justify-content-center">
      {loading && <LoadingSpinner />} 
      <div className="col-sm-6 p-4 border rounded shadow-sm bg-light">
      
        <h2 className="text-center mb-4">Apply for a Job</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel label="Full Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} required />
            <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Email" className="mb-3">
            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Job Title" className="mb-3">
            <Form.Control type="text" placeholder="Enter your job title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
          </FloatingLabel>

          <Form.Select value={jobId} className="mb-3 p-3" onChange={e => setJobId(e.target.value)} required>
            <option value="">-- Select a job --</option>
            {jobs.map(job => <option key={job.id} value={job.id}>{job.title}</option>)}
          </Form.Select>

          {/* Hidden recruiterId field */}
          <Form.Control type="hidden" value={recruiterId} onChange={e => setRecruiterId(e.target.value)} />

          <Form.Group controlId="resume" className="mb-3">
            <Form.Label>Upload Resume (PDF)</Form.Label>
            <Form.Control type="file" accept="application/pdf" onChange={e => setResume(e.target.files[0])} required />
          </Form.Group>

          <Button className="w-100 mt-3" variant="primary" data-bs-dismiss="alert" aria-label="Close" type="submit">
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ApplicantForm;
