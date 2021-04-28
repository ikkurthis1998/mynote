import { useContext } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


const Login = () => {
    const {dispatch} = useContext(AuthContext);
    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "80vh"}}>
            <Card className="w-100 p-4" style={{maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">LogIn</h2>
                    <Form onSubmit={(e) => {
                                            e.preventDefault()
                                            dispatch({type: "login"})
                                            }           
                                    }>
                        <Form.Group id="email" className="w-100 mt-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required onChange={(e) => 
                                                                    dispatch({type: "field", field: "email", value: e.target.value
                                                                })} />
                        </Form.Group>
                        <Form.Group id="password" className="w-100 mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => 
                                                                    dispatch({type: "field", field: "password", value: e.target.value
                                                                    })} />
                        </Form.Group>
                        <Button type="submit" className="px-4 py-2 d-flex m-auto mt-4 mb-2">LogIn</Button>
                    </Form>
                    <p className="mt-4">Don't have an account? <Link to='/signup'>SignUp</Link></p>
                    <p className="mt-4">Forgot Password? <Link to='/forgotpassword'>Click here</Link></p>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;