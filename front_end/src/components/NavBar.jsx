import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import chaosLogo from "../assets/chaos.png";

function NavBar() {
  return (
    <Navbar className="navbar" bg="light" navbar="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Trader POE's</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/liveStash">Live Stash Browser</Nav.Link>
            <Nav.Link href="/categories">Browse Categories</Nav.Link>
            <Nav.Link href="/signIn">Sign In</Nav.Link>
            <Nav.Link href="/signUp">Sign Up</Nav.Link>
            <NavDropdown title="More Options" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  );
}
export default NavBar;
