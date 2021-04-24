import React, { useState } from 'react';
import './Note.css';
import { db } from '../firebase_config';

const Note = ({setNewNote}) => {

    const [title, setTitle] = useState(null);

    const titleInputHandle = (e) => {
        setTitle(e.target.value);
    }

    const proceedHandle = () => {
        db.collection("notes").add({title: title}).catch((error) => {
            console.error("Error writing document: ", error);
        });
        setNewNote(false);
    }

    return (
        <div className="noteform-container">
            <form className="noteform-form" onSubmit={(e) => e.preventDefault()}>
                <input className="notetitle" type="text" onChange={(e) => titleInputHandle(e)} />
                <button type="submit" className="proceed-button" onClick={() => proceedHandle()}>Proceed</button>
            </form>
        </div>
    )
}

export default Note;
