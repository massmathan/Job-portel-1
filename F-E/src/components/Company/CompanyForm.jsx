import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';



function CompanyForm() {
  const [validated, setValidated] = useState(false);
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [Address,setAddress] = useState('');

  const [logoFile,setLogoFile] = useState(null);
    const { id } = useParams(); 
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');


  useEffect(() => {
    console.log("token:", token);
  if (id) {
    axios.get(`http://localhost:8080/api/company/get/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => {
        const c = res.data;
        setCompanyName(c.companyName);
        setAddress(c.address);
        setWebsite(c.website);
        setDescription(c.description);
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

  const formData = new FormData();
  formData.append("companyName", companyName);
  formData.append("address", Address);
  formData.append("website", website);
  formData.append("description", description);
  formData.append("logo", logoFile);

  try {
    if (id) {
      await axios.put(
        `http://localhost:8080/api/company/edit/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Company updated successfully!");
    } else {
      await axios.post(
        "http://localhost:8080/api/company/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Company submitted successfully!");
    }
    navigate('/company-list'); 
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Submission failed. Check console for error.");
  }
};

  return (
    <div className="container pt-5 pb-5 d-flex justify-content-center text-align-center">
      <div className="col-sm-5 p-4 border rounded">
        <div className='d-flex justify-c    ontent-center p-3'><h1 className='text-align-center'>Company Details</h1></div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
         
              <Form.Group controlId="name">
                <FloatingLabel label="Company Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your Company Name"
                    value = {companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your Company Name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
           
              
          <Form.Group controlId="address">
            <FloatingLabel label="address " className="mb-3">
             <Form.Control
                as="textarea"        
                rows={3}             
                placeholder="Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />

              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="website">
            <FloatingLabel label="website" className="mb-3">
              <Form.Control
                type= 'text' 
                placeholder="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a website.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="description">
            <FloatingLabel label="description" className="mb-3">
               <Form.Control
                as="textarea"        
                rows={3}             
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // onBlur={handleEmailValidation}
                />
              
            </FloatingLabel>
          </Form.Group>

                    <Form.Group className="mb-3 pb-3">
            <Form.Label>Upload Logo</Form.Label>
            <Form.Control 
                type="file" 
                accept="image/*" // only images
                onChange={(e) => setLogoFile(e.target.files[0])} 
                required
            />
            </Form.Group>

            {logoFile && (
            <div className="mt-2 p-3 ">
                <img 
                // className='rounded-circle'
                src={URL.createObjectURL(logoFile)}
                alt="Logo Preview"
                style={{ width: '80px', height: '80px' }}
                />
            </div>
            )}
          <Button className='w-100 p-3' variant="primary" type="submit">
            submit
          </Button>
        </Form>
          
      </div>
    </div>
  );
}

export default CompanyForm;
