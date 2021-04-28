import { Navbar, Nav, Button } from "react-bootstrap";


const NavbarComponent = () => {

    const logoOpening = "<";
    const logoClosing = "/>";
    
    return(
        <Navbar expand="lg" className="m-auto" style={{borderBottom: "1px solid #d9d9d9"}}>
            <Navbar.Brand href="/" className="ms-5">{logoOpening}<span>My</span>Note{logoClosing}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{border: "none"}} className="me-5"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-5">
                    <Nav.Link href="/" className="m-auto">Home</Nav.Link>
                    <Nav.Link href="/login" className="m-auto"><Button>LogIn</Button></Nav.Link>
                    <Nav.Link href="/signup" className="m-auto"><Button>SignUp</Button></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent;