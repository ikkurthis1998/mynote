import React, { useState } from 'react';
import './Note.css';
import { db } from '../firebase_config';

const Note = ({setNewNote}) => {

    const [title, setTitle] = useState(null);

    const titleInputHandle = (e) => {
        setTitle(e.target.value);
    }

    const proceedHandle = () => {
        db.collection("notes").add({title: title});
        setNewNote(false);
    }

    return (
        <div className="noteform-container">
            <input className="notetitle" type="text" onChange={(e) => titleInputHandle(e)} />
            <button className="proceed-button" onClick={() => proceedHandle()}>Proceed</button>
        </div>
    )
}

export default Note;
