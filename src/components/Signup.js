import { Card, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Signup = () => {
    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "80vh"}}>
            <Card className="w-100 p-4" style={{maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">SignUp</h2>
                    <Form>
                        <Form.Group id="email" className="w-100 mt-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"  required />
                        </Form.Group>
                        <Form.Group id="password" className="w-100 mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  required />
                        </Form.Group>
                        <Form.Group id="confirm-password" className="w-100 mt-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password"  required />
                        </Form.Group>
                        <Button type="submit" className="px-4 py-2 d-flex m-auto mt-4 mb-2">SignUp</Button>
                        <p className="mt-4">Already have an account? <Link to='/login'>LogIn</Link></p>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Signup;