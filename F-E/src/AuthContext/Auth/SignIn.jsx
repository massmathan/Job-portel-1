import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../AuthContext';
import { useNavigate  } from 'react-router-dom';

function SignIn() {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const credentials = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/generateTokens',
        credentials
      );

      console.log("Server Response:", response.data);

      
      const { accessToken, users  } = response.data;

      login({users}, accessToken);

      console.log("Login successful, user:", users);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error.response || error);
      // TODO: show error message to the user
    }
  };

  return (
    <div className="container pt-5 d-flex justify-content-center text-align-center">
      <div className="col-sm-5 p-4 border rounded shadow-sm bg-light">
        <div className='d-flex justify-content-center p-3'>
          <h1 className='text-align-center'>SignIn</h1>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Show Password"
              onChange={() => setShowPassword(!showPassword)}
            />
          </Form.Group>

          <Button className='w-100' variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div className='col-sm p-3 d-flex flex-row justify-content-center align-items-center'>
          <p>Don't have account? <a href="/signup"> SignUp</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
