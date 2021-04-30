import { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { auth } from '../firebase_config';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(null);

    const forgotPassword = () => {
        setLoading(true);
        auth.sendPasswordResetEmail(email)
        .then(() =>{
            setLoading(false);
            setDone(true);
        }).catch((error) =>{
            setLoading(false);
            setError(error.message);
        })
    }

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "80vh"}}>
            <Card className="w-100 p-4" style={{maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Forgot Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {done && <Alert variant="success">A password reset link has been sent to your email.</Alert>}
                    {!done && <Form onSubmit={(e) => {e.preventDefault(); forgotPassword();}}>
                                <Form.Group id="email" className="w-100 mt-4">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                                </Form.Group>
                                <Button type="submit" className="px-4 py-2 d-flex m-auto mt-4 mb-2" disabled={loading}>{loading ? "Loading" : "Reset Password"}</Button>
                            </Form>
                    }
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ForgotPassword;