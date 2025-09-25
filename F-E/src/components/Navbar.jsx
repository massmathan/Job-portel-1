import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbars(){

    return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"><img src="/logoimg.png" alt="logo"width={80} height={60}  /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/ALLJOBS"> ALL JOBS</Nav.Link>
            <Nav.Link href="#link">APPLICANT'S APPLICATIONS</Nav.Link>
            <Nav.Link href="/job-form"> POST NEW JOB</Nav.Link>
            <Nav.Link href="/job-list"> VIEW YOUR JOBS</Nav.Link>
            <Nav.Link href="/company-list"> COMPANY LIST</Nav.Link>
            {/* <Nav.Link href="/company-form"> ADD COMPANY</Nav.Link> */}
            <Nav.Link href="#link"> PROFILE</Nav.Link>
            <Nav.Link href="#link"> SETTINGS</Nav.Link>
            <Nav.Link href="#link"> LOGOUT</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;