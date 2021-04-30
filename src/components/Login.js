import { useContext, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase_config';


const Login = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = () => {
        setLoading(true);
        auth.signInWithEmailAndPassword(authState.email, authState.password)
        .then((userCredential) => {
            // console.log(userCredential);
            setError('');
            setLoading(false);
            // dispatch({type: "login", field: "uid", value: userCredential.user.uid})
        }).catch((error) => {
            setLoading(false);
            setError(error.message);
        })
    }

    const {authState, dispatch} = useContext(AuthContext);
    // console.log(authState)
    if (authState.isLoggedIn) {
        return(<Redirect to='/' />)
    } else {
    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "80vh"}}>
            <Card className="w-100 p-4" style={{maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">LogIn</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={(e) => {
                                            e.preventDefault();
                                            login();
                                            
                                            }           
                                    }>
                        <Form.Group id="email" className="w-100 mt-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required onChange={(e) => {
                                                                                dispatch({type: "field", field: "email", value: e.target.value})
                                                                                setError('');
                                                                                }
                                                                            } />
                        </Form.Group>
                        <Form.Group id="password" className="w-100 mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => {
                                                                                    dispatch({type: "field", field: "password", value: e.target.value})
                                                                                    setError('');
                                                                                    }
                                                                                } />
                        </Form.Group>
                        <Button type="submit" className="px-4 py-2 d-flex m-auto mt-4 mb-2" disabled={loading}>{loading ? "Loading..." : "LogIn"}</Button>
                    </Form>
                    <p className="mt-4">Don't have an account? <Link to='/signup'>SignUp</Link></p>
                    <p className="mt-4">Forgot Password? <Link to='/forgotpassword'>Click here</Link></p>
                </Card.Body>
            </Card>
        </Container>
    )}
}

export default Login;