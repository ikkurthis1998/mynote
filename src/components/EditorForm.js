import React, { useContext, useEffect } from 'react';
import {Editor} from '@tinymce/tinymce-react';
import { usersdb } from '../firebase_config';
import { ScreenContext } from '../contexts/ScreenContext';
import { EditorContext } from '../contexts/EditorContext';
import { AuthContext } from '../contexts/AuthContext';


const MyEditor = () => {

    // const [isloading, setIsloading] = useState(false);

    const screenWidth = useContext(ScreenContext);
    const {editorState, editorDispatch} = useContext(EditorContext);
    const {authState} = useContext(AuthContext);
    
    const backButtonHandle = () => {
        editorDispatch({type: "back"});
    }

    const saveButtonHandle = () => {
        // console.log(editorState);
        usersdb.doc(authState.uid).collection("notes").doc(editorState.id)
            .set({
                ...editorState,
                title: editorState.title,
                content: editorState.content,
                updatedAt: new Date().toString()
            }).catch((error) => {
                console.log(error);
            })
    }

    // useEffect(() => {
    //     try {
    //         setIsLoading(true);
    //         const unsub = usersdb.doc(authState.uid).collection("notes").doc(editorState.id).onSnapshot((snap) => {
    //             const title = snap.data().title;
    //             const content = snap.data().content;
    //             const createdAt = snap.data().createdAt;
    //             setTitle(title);
    //             setContent(content);
    //             setCreatedAt(createdAt);
    //         })
    //         return () => unsub();
    //     } catch(error) {
    //         console.error("Error writing document: ", error);
    //     }
    //     finally {
    //         setIsLoading(false);
    //     }
    // }, [editorState.id])

    useEffect(() => {
        const delay = setTimeout(() => {
            // console.log({title: title, content: content});
            if(editorState.content != null && editorState.title !=null) {
                const unsub = usersdb.doc(authState.uid).collection("notes").doc(editorState.id)
                .set({
                    ...editorState,
                    title: editorState.title,
                    content: editorState.content,
                    updatedAt: new Date().toString()
                }).catch((error) => {
                    console.log(error);
                })
                return () => unsub();
            }
        }, 1500)

        return () => clearTimeout(delay);
    }, [editorState, authState.uid])

    // useEffect(() => {
    //     usersdb.doc(authState.uid).collection("notes").doc(editorState.id)
    //         .set({
    //             ...noteDoc.data(),
    //             title: editorState.title,
    //             content: editorState.content,
    //             updatedAt: new Date().toString()
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    // }, [])

    return (
    
        <div className="">
            <form onSubmit={(e) => e.preventDefault()}>
                {screenWidth > 450 && 
                    <div className="d-flex">
                        {screenWidth < 1024 && <button style={{width: "120px"}} className="btn btn-primary" onClick={() => backButtonHandle()} >Back</button> }
                        <input required className="w-100 p-2"
                            style={{border: "none", height: "40px"}}
                            placeholder = {"Title"}
                            value = {editorState.title}
                            onChange = {(e) => {editorDispatch({type: "field", field: "title", value: e.target.value})}}
                        />
                        <button type="submit" style={{width: "120px"}} className="btn btn-primary" onClick={() => saveButtonHandle()} >Save</button>
                    </div>
                }
                {screenWidth < 450 && 
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                            <button className="w-100 btn btn-primary me-1 ms-1" onClick={() => backButtonHandle()} >Back</button>
                            <button type="submit" className="w-100 btn btn-primary ms-1 me-1" onClick={() => saveButtonHandle()} >Save</button>
                        </div>
                        <div>
                            <input required className="w-100 p-2"
                                style={{border: "none", height: "40px"}}
                                placeholder = "Title"
                                value = {editorState.title}
                                onChange = {(e) => {editorDispatch({type: "field", field: "title", value: e.target.value})}}
                            />
                        </div>
                    </div>
                }
                <Editor 
                    init={{
                    statusbar: false,
                    menubar: false,
                    height: "86vh",
                    plugins: [
                        'advlist autolink link image imagetools media lists charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code codesample fullscreen insertdatetime nonbreaking',
                        'table emoticons template paste help insertdatetime noneditable'
                    ],  
                    toolbar: ' searchreplace | help | fontselect | code codesample | insertdatetime | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media quickbars| print preview fullscreen | forecolor backcolor emoticons',
                    // advlist_bullet_styles: 'square',
                    // advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman'
                    }}
                    // placeholder = {true ? "Loading..." : ""}
                    onEditorChange={(e) => {editorDispatch({type: "field", field: "content", value: e})}}
                    value={editorState.content}
                />
            </form>
        </div>
    )
}

export default MyEditor;
