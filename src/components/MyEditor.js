import React, { useEffect, useState } from 'react';
import {Editor} from '@tinymce/tinymce-react';
import './MyEditor.css';
import { db } from '../firebase_config';

const MyEditor = ({noteDoc, screenWidth, setEditor}) => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const collection = "notes";

    useEffect(() => {
        const unsub = db.collection(collection).doc(noteDoc.id).onSnapshot((snap) => {
            const title = snap.data().title;
            const content = snap.data().content;
            setTitle(title);
            setContent(content);
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
                .set({title: title, content: content}, (error) => {
                    console.error("Error writing document: ", error);
                })
                return () => unsub();
            }
        }, 2000)

        return () => clearTimeout(delay);
    }, [title, content, noteDoc.id])

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
        .set({title: title, content: content}, (error) => {
            console.error("Error writing document: ", error);
        })
    }
    

    return (
    
        <div className="myeditor-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="title-container">
                    {screenWidth < 1024 && <button className="back-button" onClick={() => backButtonHandle()} >Back</button> }
                    <input required className="note-title"
                        value={title ? title : ""}
                        onChange={(e) => {e.target.value ? setTitle(e.target.value) : alert("Sorry, erasing the entire title is not allowed")}}
                    />
                    <button type="submit" className="save-button" onClick={() => saveButtonHandle()} >Save</button>
                </div>
                <Editor 
                    init={{
                    statusbar: false,
                    menubar: false,
                    height: "95vh"
                    }}
                    
                    onEditorChange={(e) => setContent(e)}
                    value={content ? content : ""}
                />
            </form>
        </div>
    )
}

export default MyEditor;
