import React, {useState, useEffect} from 'react';
import './NoteList.css';
import Note from './Note';
import { db } from '../firebase_config';

const NoteList = ({setNoteDoc, setEditor}) => {
    const [newNote, setNewNote] = useState(false);
    const [noteslist, setNoteslist] = useState(null);
    
    useEffect(() => {
        const unsub = db.collection("notes").onSnapshot((snap) => {
            setNoteslist(snap.docs);
        })

        return () => {
            unsub()
        }
    }, [])

    const addNote = () => {
        setNewNote(!newNote);
    }

    const noteClickHandle = (doc) => {
        setEditor(true);
        setNoteDoc(doc);
    }

    return (
        <div className="notelist-container">
            <div className="form-container">
                <button onClick={() => addNote()} className={newNote ? "cancel-button" : "add-button"}>{newNote ? "X" : "+"}</button>
                {newNote && <Note setNewNote={setNewNote} />}
            </div>
            {
                noteslist && noteslist.map((doc) => {
                    return (
                        <div key={doc.id} onClick={() => noteClickHandle(doc)}>
                            <h1>{doc.data().title}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NoteList;
