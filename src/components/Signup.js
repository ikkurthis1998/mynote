import { useContext, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase_config';

const Signup = () => {

    const { authState, dispatch } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(authState);

    const signup = () => {
        if(authState.password !== authState.confirmPassword){
            setError("Passwords do not match");
        } else {
            setLoading(true);
            auth.createUserWithEmailAndPassword(authState.email, authState.password)
            .then((userCredential) => {
                    setError('');
                    setLoading(false);
                // dispatch({type: "sigup", field: "uid", value: userCredential.user.uid});
            }).catch((error) => {
                setLoading(false);
                setError(error.message)
            })
        }
    }
    
    if (authState.isLoggedIn) {
        return(<Redirect to='/updateprofile' />)
    } else {
    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "90vh"}}>
            <Card className="w-100 p-4" style={{maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">SignUp</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={(e) => {e.preventDefault(); signup()}}>
                        <Form.Group id="email" className="w-100 mt-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required onChange={(e) => {
                                                                                dispatch({type: "field", field: "email", value: e.target.value})
                                                                                setError('')
                                                                                }   
                                                                            } />
                        </Form.Group>
                        <Form.Group id="password" className="w-100 mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => {
                                                                                    dispatch({type: "field", field: "password", value: e.target.value})
                                                                                    setError('')
                                                                                    }    
                                                                                } />
                        </Form.Group>
                        <Form.Group id="confirm-password" className="w-100 mt-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => {
                                                                                    dispatch({type: "field", field: "confirmPassword", value: e.target.value})
                                                                                    setError('')
                                                                                    }    
                                                                                } />
                        </Form.Group>
                        <Button type="submit" className="px-4 py-2 d-flex m-auto mt-4 mb-2" disabled={loading}>{loading ? "Loading..." : "SignUp"}</Button>
                        <p className="mt-4">Already have an account? <Link to='/login'>LogIn</Link></p>
                        <p className="mt-4">Already have an account and Forgot Password? <Link to='/forgotpassword'>Click here</Link></p>
                    </Form>
                </Card.Body>
                <small style={{fontSize: "12px"}}>*Please do not refresh this page</small>
            </Card>
        </Container>
    )}
}

export default Signup;