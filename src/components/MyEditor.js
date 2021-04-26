import React, { useEffect, useState } from 'react';
import {Editor} from '@tinymce/tinymce-react';
import './MyEditor.css';
import { db } from '../firebase_config';

const MyEditor = ({noteDoc, screenWidth, setEditor}) => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [createdAt,  setCreatedAt] = useState(null);
    const collection = "notes";

    useEffect(() => {
        const unsub = db.collection(collection).doc(noteDoc.id).onSnapshot((snap) => {
            const title = snap.data().title;
            const content = snap.data().content;
            const createdAt = snap.data().createdAt;
            setTitle(title);
            setContent(content);
            setCreatedAt(createdAt);
        }, (error) => {
            console.error("Error writing document: ", error);
        })
        return () => unsub();
    }, [noteDoc.id])

    // const contentChangeHandle = (e) => {
    //     setContent(e);
    // }   
    
    // const titleChangeHandle = (e) => {
    //     setTitle(e.target.value);
    // }    

    const backButtonHandle = () => {
        setEditor(false);
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            // console.log({title: title, content: content});
            if(content != null && title !=null) {
                const unsub = db.collection(collection).doc(noteDoc.id)
                .set({title: title, content: content, createdAt: createdAt, updatedAt: new Date().toString()}, (error) => {
                    console.error("Error writing document: ", error);
                })
                return () => unsub();
            }
        }, 1500)

        return () => clearTimeout(delay);
    }, [title, content, createdAt, noteDoc.id])

    // var delay = (function(){
    //     var timer = 0;
    //     return function(callback, ms){
    //       clearTimeout (timer);
    //       timer = setTimeout(callback, ms);
    //     };
    // })();

    // const sendToDataBase = () => {
    //     setNote({title: title, content: content});
    //     // if(timer) clearTimeout(timer);
    //     console.log(note);
    //     // return () => clearTimeout(timer);
    //     // db.collection(collection).doc(noteDoc.id).set(note);
    // }

    const saveButtonHandle = () => {
        db.collection(collection)
        .doc(noteDoc.id)
        .set({title: title, content: content, createdAt: createdAt, updatedAt: new Date().toString()}, (error) => {
            console.error("Error writing document: ", error);
        })
        setEditor(false);
    }
    

    return (
    
        <div className="myeditor-container">
            <form onSubmit={(e) => e.preventDefault()}>
                {screenWidth > 450 && 
                    <div className="title-container">
                        {screenWidth < 1024 && <button className="back-button" onClick={() => backButtonHandle()} >Back</button> }
                        <input required className="note-title"
                            value={title ? title : ""}
                            onChange={(e) => {setTitle(e.target.value)}}
                        />
                        <button type="submit" className="save-button" onClick={() => saveButtonHandle()} >Save</button>
                    </div>
                }
                {screenWidth < 450 && 
                    <div className="title-container">
                        <div className="button-container">
                        <button className="back-button" onClick={() => backButtonHandle()} >Back</button>
                            <button type="submit" className="save-button" onClick={() => saveButtonHandle()} >Save</button>
                        </div>
                        <div>
                            <input required className="note-title"
                                value={title ? title : ""}
                                onChange={(e) => {setTitle(e.target.value)}}
                            />
                        </div>
                    </div>
                }
                <Editor 
                    init={{
                    statusbar: false,
                    menubar: false,
                    height: "95vh",
                    plugins: [
                        'advlist autolink link image imagetools media lists charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code codesample fullscreen insertdatetime nonbreaking',
                        'table emoticons template paste help insertdatetime noneditable'
                    ],  
                    toolbar: 'searchreplace | help | fontselect | code codesample | insertdatetime | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media quickbars| print preview fullscreen | forecolor backcolor emoticons',
                    // advlist_bullet_styles: 'square',
                    // advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman'
                    }}
                    
                    onEditorChange={(e) => setContent(e)}
                    value={content ? content : ""}
                />
            </form>
        </div>
    )
}

export default MyEditor;
