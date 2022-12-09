import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {

    return (
        <Container>
        <Navbar bg="light" expand="lg">
            <Nav>
                <Nav.Item>
                    <Nav.Link href='/'>HOME</Nav.Link>
                    {/* <Nav.Link href={`/#/sections/${section.tag}`}></Nav.Link> */}
                </Nav.Item>
            </Nav>
        </Navbar>
        </Container>
    )
  }
  export default NavBar;