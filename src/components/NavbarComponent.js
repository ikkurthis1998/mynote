import { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ScreenContext } from "../contexts/ScreenContext";
import { auth } from "../firebase_config";
import Logo from './Logo';


const NavbarComponent = () => {
    const {authState, dispatch} = useContext(AuthContext);
    const screenWidth = useContext(ScreenContext);
    // console.log(screenWidth)
    const signout = () => {
        auth.signOut()
        dispatch({type: "currentUser", uid: '', email: '', isLoggedIn: false})
    }

    const toggleMenu = () => {
        if(screenWidth < 992) {
            const navMenuButton = document.querySelector('[aria-controls]');
            navMenuButton.click();
        }
    }
    
    return(
        <Navbar expand="lg" className="m-auto" style={{borderBottom: "1px solid #d9d9d9"}}>
            <Navbar.Brand className="ms-5"><Link to='/' style={{color: "black", textDecoration: "none"}}>{!authState.isLoggedIn ? <Logo logoSize="30px" /> : <Logo logoSize="30px" name={authState.displayName} />}</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{border: "none"}} className="me-5"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-5">
                    <Link className="me-auto my-auto ms-5 py-3" to="/" style={{color: "black", textDecoration: "none"}} onClick={() => toggleMenu()}>Home</Link>
                    {!authState.isLoggedIn && <>
                    <Link className="me-auto ms-5 my-3" to="/login" style={{color: "white", textDecoration: "none"}} onClick={() => toggleMenu()}><Button style={{width: "86px"}}>LogIn</Button></Link>
                    <Link className="me-auto ms-5 my-3"  to="/signup" style={{color: "white", textDecoration: "none"}} onClick={() => toggleMenu()}><Button style={{width: "86px"}}>SignUp</Button></Link>
                    </>}
                    {authState.isLoggedIn && <>
                    <Link className="me-auto my-auto ms-5 py-3" to="/updateprofile" style={{color: "black", textDecoration: "none"}} onClick={() => toggleMenu()}>Update Profile</Link>
                    <Link className="me-auto ms-5 my-3"  to="/" style={{color: "white", textDecoration: "none"}}><Button style={{width: "86px"}} onClick={() => {signout();toggleMenu()}}>SignOut</Button></Link>
                    </>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent;