import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

export default function Navbars() {
  const { user, role, logout } = useContext(AuthContext);

  // Define role-based links in an object for easier management
  const roleLinks = {
    ADMIN: [
      { to: "/admin/dashboard", label: "Admin Dashboard" },
       { to: "/job-list", label: "All Jobs" },
      { to: "/company-list", label: "Company List" },
      { to: "/job-form", label: "Post New Job" },
      { to: "/applicants-list", label: "All Applicants" },
      { to: "/analytics", label: "Analytics" },
    ],
    RECRUITER: [
      { to: "/recruiter/dashboard", label: "Recruiter Dashboard" },
      //  { to: "/job-list", label: "All Jobs" },
      { to: "/job-form", label: "Post New Job" },
      { to: "/job-list", label: "View Your Jobs" },
      { to: "/applicants-list", label: "Applicants" },
      { to: "/analytics", label: "Analytics" },
    ],
    USER: [
      { to: "/user/dashboard", label: "Dashboard" },
      { to: "/job-list", label: "Browse Jobs" },
      { to: "/applicants-list", label: "My Applications" },
    ],
  };

  const linksToRender = user && roleLinks[role] ? roleLinks[role] : [];

  return (
   <Navbar bg="" expand="lg" className="mb-4">
      <Container className="Container">
        <Navbar.Brand as={NavLink} to="/dashboard">
          <img src="/logoimg.png" alt="logo" width={80} height={60} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
    <Nav className="NavManu ms-auto flex-column flex-lg-row w-100 justify-content-around ">
            {linksToRender.map((link) => (
              <Nav.Link
                key={link.to}
                as={NavLink}
                to={link.to}
                end
                className="text-center text-light fs-6 px-3 py-2"
              >
                {link.label}
              </Nav.Link>
            ))}

            {user ? (
              <NavDropdown title="Account" id="account-dropdown" align="end" className="text-center" >
                {/* <NavDropdown.Item as={NavLink} to="/profile" className="fs-6 px-3 py-2">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/settings">
                  Settings
                </NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
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
