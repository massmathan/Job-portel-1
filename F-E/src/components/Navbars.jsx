import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

export default function Navbars() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/logoimg.png" alt="logo" width={80} height={60} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/alljobs">
              All Jobs
            </Nav.Link>

            {user && (
              <>
                <Nav.Link as={NavLink} to="/applications">
                  Applicant's Applications
                </Nav.Link>
                <Nav.Link as={NavLink} to="/job-form">
                  Post New Job
                </Nav.Link>
                <Nav.Link as={NavLink} to="/job-list">
                  View Your Jobs
                </Nav.Link>
                <Nav.Link as={NavLink} to="/company-list">
                  Company List
                </Nav.Link>

                <NavDropdown title="Account" id="account-dropdown">
                  <NavDropdown.Item as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {!user && (
              <>
                <Nav.Link as={NavLink} to="/signin">
                  Sign In
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
