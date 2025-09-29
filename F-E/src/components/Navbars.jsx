import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

export default function Navbars() {
  const { user, role, logout } = useContext(AuthContext);

  // Menus for each role
  const adminLinks = (
    <>
      <Nav.Link as={NavLink} to="/admin/dashboard" end>
        Admin Dashboard
      </Nav.Link>
      <Nav.Link as={NavLink} to="/company-list">
        Company List
      </Nav.Link>
        <Nav.Link as={NavLink} to="/job-form">
        Post New Job
      </Nav.Link>
      <Nav.Link as={NavLink} to="/job-list">
        All Jobs
      </Nav.Link>
      <Nav.Link as={NavLink} to="/applicants-list">
        All Applicants
      </Nav.Link>
    </>
  );

  const recruiterLinks = (
    <>
      <Nav.Link as={NavLink} to="/recruiter/dashboard" end>
        Recruiter Dashboard
      </Nav.Link>
      <Nav.Link as={NavLink} to="/job-form">
        Post New Job
      </Nav.Link>
      <Nav.Link as={NavLink} to="/job-list">
        View Your Jobs
      </Nav.Link>
      <Nav.Link as={NavLink} to="/applicants-list">
        Applicants
      </Nav.Link>
    </>
  );

  const applicantLinks = (
    <>
      <Nav.Link as={NavLink} to="/user/dashboard" end>
        Dashboard
      </Nav.Link>
      <Nav.Link as={NavLink} to="/job-list">
        Browse Jobs
      </Nav.Link>
      <Nav.Link as={NavLink} to="/applicants-list">
        My Applications
      </Nav.Link>
    </>
  );

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/dashboard">
          <img src="/logoimg.png" alt="logo" width={80} height={60} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {/* Switch menus by role */}
            {user && role === "ADMIN" && adminLinks}
            {user && role === "RECRUITER" && recruiterLinks}
            {user && role === "USER" && applicantLinks}

            {/* Account dropdown */}
            {user && (
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
            )}

            {/* When no user logged in */}
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
