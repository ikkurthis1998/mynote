import React from 'react';
import { Alert, Container } from 'react-bootstrap';

const PageNotFound = () => {
    const logoOpening = "<";
    const logoClosing = "/>";
    return(
        <Container className="text-center d-flex justify-content-center align-items-center" style={{width: "1000px", height: "80vh"}}>
            <Alert variant="danger" style={{fontSize: "20px", padding: "100px"}}>
                <h1 className="mb-3">
                    <span style={{fontFamily: "'Shadows Into Light', cursive", fontSize: "60px"}}>
                        {logoOpening}NoNote {logoClosing}
                    </span>
                </h1>
                404/Page Not Found
            </Alert>
        </Container>
    )
}

export default PageNotFound;