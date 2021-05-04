import {  useContext } from "react";
import { Card,Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import Logo from './Logo';
import { AuthContext } from '../contexts/AuthContext';
import AllNotes from "./AllNotes";
import { EditorContext } from "../contexts/EditorContext";
import { ScreenContext } from "../contexts/ScreenContext";
import EditorForm from './EditorForm';


const Welcome = () => {

    const { authState, dispatch } = useContext(AuthContext);
    const screenWidth = useContext(ScreenContext);
    const { editorState } = useContext(EditorContext);
    // console.log(editorState);

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: "75vh"}}>
            {!authState.uid && <Card className="w-100 p-5" style={{maxWidth: "600px", border: screenWidth > 1023 ? "" : "none"}}>
                <Card.Body>
                    <h1 className="text-center mb-5"><span style={{fontWeight: "600"}}>Welcome to </span><p className="mt-3"><Logo logoSize="40px" /></p></h1>
                    <div className="d-flex justify-content-center">
                        <Link to='/login' className="mt-2 mx-4">
                            <Button className="btn-primary" style={{width: "96px"}}>LogIn</Button>
                        </Link> 
                        <Link to='/signup' className="mt-2 mx-4">
                            <Button className="btn-primary" style={{width: "96px"}}>SignUp</Button>
                        </Link>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to='/' className="mt-2 mx-4">
                                <Button className="btn-primary" style={{width: "126px"}} onClick={() => dispatch({type: "guest"})}>Guest Login</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
            }
            {authState.uid &&   <div className="play-ground">
                                    {screenWidth > 1023 ?   <div className="notes-container-large">
                                                                <AllNotes />
                                                            </div>                          
                                                        : editorState.editor ? <div></div>  :   <div className="w-100 mb-auto" style={{height: "90vh"}}>
                                                                                                    <AllNotes />
                                                                                                </div> 
                                    }
                                    {editorState.editor &&  <div className={screenWidth > 1023 ? "editor-container-large": "w-100"}>
                                                                <EditorForm />
                                                            </div>
                                    }
                                    
                                    {/* {editorState.editor && <EditorForm />} */}
                                </div>
            }
        </div>
    )
}

export default Welcome;