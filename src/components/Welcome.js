// import { useContext } from "react";
import { Card, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { auth } from "../firebase_config";
import Logo from './Logo';


const Welcome = () => {

    // const { authState } = useContext(AuthContext);

    auth.onAuthStateChanged((user) => {
        console.log(user.uid)
    })

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "60vh"}}>
            <Card className="w-100 p-5" style={{maxWidth: "600px"}}>
                <Card.Body>
                    <h1 className="text-center mb-5"><span style={{fontWeight: "600"}}>Welcome to </span><p className="mt-3"><Logo logoSize="40px" /></p></h1>
                    {<p></p>}
                    <div className="d-flex justify-content-center">
                        <Link to='/login' className="mt-2 mx-4">
                            <Button className="btn-primary" style={{width: "96px"}}>LogIn</Button>
                        </Link> 
                        <Link to='/signup' className="mt-2 mx-4">
                            <Button className="btn-primary" style={{width: "96px"}}>SignUp</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Welcome;