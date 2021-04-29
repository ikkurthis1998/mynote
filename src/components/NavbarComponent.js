import { Navbar, Nav, Button } from "react-bootstrap";
import Logo from './Logo';


const NavbarComponent = () => {
    
    return(
        <Navbar expand="lg" className="m-auto" style={{borderBottom: "1px solid #d9d9d9"}}>
            <Navbar.Brand href="/" className="ms-5"><Logo logoSize="30px" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{border: "none"}} className="me-5"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-5">
                    <Nav.Link href="/" className="me-auto my-auto ms-5">Home</Nav.Link>
                    <Nav.Link href="/login" className="me-auto ms-5"><Button style={{width: "86px"}}>LogIn</Button></Nav.Link>
                    <Nav.Link href="/signup" className="me-auto ms-5"><Button style={{width: "86px"}}>SignUp</Button></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent;