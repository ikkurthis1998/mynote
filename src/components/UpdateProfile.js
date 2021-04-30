import { useContext, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase_config';

const UpdateProfile = () => {

    const { authState, dispatch } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);
    // console.log(authState);
    // console.log(updated)
    const updateProfile = () => {
        setLoading(true);
        auth.currentUser.updateProfile({
            displayName: authState.displayName
        })
        .then(() => {
                setError('');
                setLoading(false);
                setUpdated(true);
            // dispatch({type: "sigup", field: "uid", value: userCredential.user.uid});
        }).catch((error) => {
            setLoading(false);
            setError(error.message)
        })
    }
    
    if (updated) {
        return(<Redirect to='/' />)
    } else {
    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "70vh"}}>
            <Card className="w-100 p-4" style={{maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={(e) => {e.preventDefault(); updateProfile()}}>
                        <Form.Group id="displayName" className="w-100 mt-4">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="text" required onChange={(e) => {
                                                                                dispatch({type: "field", field: "displayName", value: e.target.value})
                                                                                setError('')
                                                                                }   
                                                                            } />
                        </Form.Group>
                        <Button type="submit" className="px-4 py-2 d-flex m-auto mt-4 mb-2" disabled={loading}>{loading ? "Loading..." : "Save"}</Button>
                    </Form>
                </Card.Body>
                <small style={{fontSize: "12px"}}>*Please do not refresh this page</small>
            </Card>
        </Container>
    )}
}

export default UpdateProfile;