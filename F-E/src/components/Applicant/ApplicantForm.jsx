import React, { useState, useContext ,useEffect  } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function ApplicantForm() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [jobId, setJobId] = useState(""); // if applicant chooses job
   const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const { token } = useContext(AuthContext) ?? localStorage.getItem("accessToken");

  const navigate = useNavigate();

   useEffect(() => {
    axios
      .get("http://localhost:8080/api/job/getAll", {
        headers: { Authorization: `Bearer ${token}` }
      }) 
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (event) => {


    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("jobTitle", jobTitle);
    formData.append("jobId", jobId);
    formData.append("stage", 'applied'); // default stage

    try {
      await axios.post("http://localhost:8080/api/applicants/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Application submitted successfully!");
      setName("");
      setEmail("");
      setResume(null);
      setJobTitle("");
      setJobId("");
      navigate("/applications");

    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Submission failed. Check console for error.");
    }
  };

  return (
    <div className="container pt-5 pb-5 d-flex justify-content-center">
      <div className="col-sm-6 p-4 border rounded shadow-sm bg-light">
        <h2 className="text-center mb-4">Apply for a Job</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <FloatingLabel label="Full Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="email">
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="job-title">
            <FloatingLabel label="Job Title" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid job title.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

        <Form.Group controlId="jobId">
        {/* <FloatingLabel label="Select Job" className="mb-3"> */}
          <Form.Select
            value={jobId} className="mb-3 p-3"
            onChange={(e) => setJobId(e.target.value)}
          >
            <option value="">-- Select a job --</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
                 {/* (ID: {job.id}) */}
              </option>
            ))}
          </Form.Select>
        {/* </FloatingLabel> */}
      </Form.Group>

          <Form.Group controlId="resume">
            <Form.Label>Upload Resume (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please upload your resume.
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="w-100 mt-3 p-2" variant="primary" type="submit">
            Submit Application
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ApplicantForm;
