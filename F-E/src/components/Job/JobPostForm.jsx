import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';



function JobPostForm() {
  const [validated, setValidated] = useState(false);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [title,setTitle] = useState('');
  const [salary,setSalary] = useState('');
  const [skills,setSkills] = useState('');
  const [jobType,setJobType] = useState(null);

    const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
  if (id) {
    axios.get(`http://localhost:8080/api/job/get/${id}`)
      .then(res => {
        const c = res.data;
        setTitle(c.title);
        setDescription(c.description);
        setLocation(c.location);
        setSalary(c.salary);
        setSkills(c.skills);
        setJobType(c.jobType);
      })
      .catch(err => console.error(err));
  }
}, [id]);


  const handleSubmit = async (event) => {
  event.preventDefault(); 
  const form = event.currentTarget;

  if (form.checkValidity() === false) {
    event.stopPropagation();
    setValidated(true);
    return; 
  }

  setValidated(true);

    const JobPostDetails = {
      title: title,
      description: description,
      location: location,
      jobType : jobType,
      salary : salary,
      skills : skills
    };
 
  try {
    if (id) {
           await axios.put(`http://localhost:8080/api/job/edit/${id}`, JobPostDetails,
      {
         headers: {
          "Content-Type": "application/json",
       },
      });
      alert("Job updated successfully!");
    } else {
      await axios.post("http://localhost:8080/api/job/create", JobPostDetails,
      {
         headers: {
          "Content-Type": "application/json",
       },
      });
      alert("Job submitted successfully!");
    }
    navigate('/job-list'); 
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Submission failed. Check console for error.");
  }




};

  return (
    <div className="container pt-5 pb-5 d-flex justify-content-center text-align-center">
      <div className="col-sm-5 p-4 border rounded">
        <div className='d-flex justify-content-center p-3'><h1 className='text-align-center'>Job Post</h1></div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
         
              <Form.Group controlId="title">
                <FloatingLabel label="Title" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your Title"
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your title.
                  </Form.Control.Feedback>
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
                type= 'text' 
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a location.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
           
              
          <Form.Group controlId=" jobType">
            <FloatingLabel label=" Job type " className="mb-3">
             <Form.Control
                type="text"        
                placeholder=" Job type"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
                />

              <Form.Control.Feedback type="invalid">
                Please provide a valid  job type.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId=" salary">
            <FloatingLabel label="Salary " className="mb-3">
             <Form.Control
                type="text"        
                placeholder="Salary"
                value={ salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                />

              <Form.Control.Feedback type="invalid">
                Please provide a valid  salary.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

        <Form.Group controlId="skills">
            <FloatingLabel label="Skills " className="mb-3">
             <Form.Control
                type="text"        
                placeholder="Skills"
                value={ skills}
                onChange={(e) => setSkills(e.target.value)}
                required
                />

              <Form.Control.Feedback type="invalid">
                Please provide a valid  skills.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        
          <Button className='w-100 p-3' variant="primary" type="submit">
            submit
          </Button>
        </Form>
          
      </div>
    </div>
  );
}

export default JobPostForm;
