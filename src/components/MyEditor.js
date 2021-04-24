import React, { useState } from 'react';
import {Editor} from '@tinymce/tinymce-react';
import './MyEditor.css';
import { db } from '../firebase_config';

const MyEditor = ({noteDoc, screenWidth, setEditor}) => {

    const [note, setNote] = useState(null)

    db.collection("notes").doc(noteDoc.id).onSnapshot((snap) => {
        setNote(snap.data());
    })

    const backButtonHandle = () => {
        setEditor(false);
    }
    
    return (
        <div className="myeditor-container">
            <div className="title-container">
                {screenWidth < 1024 && <button className="back-button" onClick={() => backButtonHandle()} >Back</button> }
                <div className="note-title">
                    {noteDoc.data().title}
                </div>
            </div>
            <Editor 
                init={{
                statusbar: false,
                menubar: false,
                height: "100vmin"
                }}

                // value={note && note.title}
            />
        </div>
    )
}

export default MyEditor;
