import { Card, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom";


const Welcome = () => {

    const logoOpening = "<";
    const logoClosing = "/>";

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "60vh"}}>
            <Card className="w-100 p-5" style={{maxWidth: "600px"}}>
                <Card.Body>
                    <h1 className="text-center mb-5">Welcome to {logoOpening}<span>My</span>Note{logoClosing}</h1>
                    <div className="d-flex justify-content-center">
                        <Link to='/login' className="mt-3">
                            <Button className="btn-primary mx-2">LogIn</Button>
                        </Link> 
                        <Link to='/signup' className="mt-3">
                            <Button className="btn-primary mx-2">SignUp</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Welcome;