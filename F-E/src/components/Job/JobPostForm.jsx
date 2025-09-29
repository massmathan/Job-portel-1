import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function JobPostForm() {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("");
  const [companyId, setCompanyId] = useState("");
     const [companys, setCompanys] = useState([]);

  const { token } = useContext(AuthContext) ?? { token: localStorage.getItem("accessToken") };
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Load job data if editing
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/company/getAll", {
        headers: { Authorization: `Bearer ${token}` }
      }) 
      .then((res) =>{ setCompanys(res.data); console.log(res.data); } )
      .catch((err) => console.error(err));


    if (id) {
      axios
        .get(`http://localhost:8080/api/job/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          const job = res.data;
          setTitle(job.title);
          setDescription(job.description);
          setLocation(job.location);
          setSalary(job.salary);
          setSkills(job.skills);
          setJobType(job.jobType);
          setCompanyId(job[0].id);
        })
        .catch(err => console.error(err));
    }
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

    const JobPostDetails = { title, description, location, jobType, salary,  skills: skills.split(",").map(s => s.trim()), companyId: Number(companyId)  };
    console.log(JobPostDetails);
    try {
      console.log("Submitting JobPostDetails:", JobPostDetails);
      console.log(token);
      if (id) {
        await axios.put(`http://localhost:8080/api/job/edit/${id}`, JobPostDetails, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        alert("Job updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/job/create", JobPostDetails, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        alert("Job submitted successfully!");
      }
      navigate("/job-list");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Check console for error.");
    }
  };

  return (
    <div className="container pt-5 pb-5 d-flex justify-content-center">
      <div className="col-sm-5 p-4 border rounded shadow-sm bg-light">
        <h1 className="text-center mb-4">Job Post</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

         <Form.Group controlId="companyId">
          {/* <FloatingLabel label="Select Job" className="mb-3"> */}
            <Form.Select
              value={companyId} className="mb-3 p-3"
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <option value="">-- Select a Company --</option>
              {companys.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.companyName}
                  {/* (ID: {job.id}) */}
                </option>
              ))}
            </Form.Select>
          {/* </FloatingLabel> */}
        </Form.Group>

          <Form.Group controlId="title">
            <FloatingLabel label="Title" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide your title.</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="description">
            <FloatingLabel label="Description" className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="location">
            <FloatingLabel label="Location" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a location.</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="jobType" className="mb-3">
            <Form.Select className=" p-3"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a valid job type.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="salary">
            <FloatingLabel label="Salary" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide a valid salary.</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="skills">
            <FloatingLabel label="Skills (comma separated)" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">Please provide valid skills.</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button className="w-100 p-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default JobPostForm;
