import React, { useState } from 'react';
import './Note.css';
import { db } from '../firebase_config';

const Note = ({setNewNote, setEditor, setNoteDoc}) => {

    const [title, setTitle] = useState(null);

    const titleInputHandle = (e) => {
        setTitle(e.target.value);
    }

    const proceedHandle = () => {
        if(title != null) {
            db.collection("notes").add({title: title}).then(function(docRef) {
                setNoteDoc(docRef);
                setNewNote(false);
                setEditor(true);
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
            
            // setNoteDoc(doc);
        }
        else{
            alert("Please give a title")
        }
    }

    return (
        <div className="noteform-container">
            <form className="noteform-form" onSubmit={(e) => e.preventDefault()}>
                <input required className="notetitle" type="text" onChange={(e) => titleInputHandle(e)} />
                <button type="submit" className="proceed-button" onClick={() => proceedHandle()}>Proceed</button>
            </form>
        </div>
    )
}

export default Note;
