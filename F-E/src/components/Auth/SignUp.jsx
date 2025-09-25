import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from "axios";



function SignUp() {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const form = event.currentTarget;

    if (form.checkValidity() === false || password !== confirmPassword) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const user = {
      // name: `${firstName} ${lastName}`,
      userName: email,
      password: confirmPassword,
      roles : 'user'
    };

    try {
      console.log(user);
      const response = await axios.post("http://localhost:8080/api/auth/addNewUser", user);
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEmailValidation = async (event) => {
    console.log(event.target.value);
  };


  return (
    <div className="container pt-5 d-flex justify-content-center text-align-center">
      <div className="col-sm-5 p-4 border rounded">
        <div className='d-flex justify-content-center p-3'><h1 className='text-align-center'>SignUp</h1></div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col> 
              <Form.Group controlId="firstName">
                <FloatingLabel label="First Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    value = {firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your first name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="lastName">
                <FloatingLabel label="Last Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    value = {lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your last name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email">
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                    // onBlur={handleEmailValidation}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="password">
            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <FloatingLabel label="Confirm Password" className="mb-3">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                isInvalid={validated && password !== confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                Passwords must match.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Show Password"
              onChange={() => setShowPassword(!showPassword)}
            />
          </Form.Group>

          <Button className='w-100' variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
          <div className='col-sm p-3 d-flex flex-row justify-content-center align-items-cente'>
             <p>Already have an account? <a href="/signin"  className=''> Sign In</a></p>
          </div>
      </div>
    </div>
  );
}

export default SignUp;
