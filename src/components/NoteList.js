import React, {useState, useEffect} from 'react';
import './NoteList.css';
import Note from './Note';
import { db } from '../firebase_config';

const NoteList = ({setNoteDoc, setEditor}) => {
    const [newNote, setNewNote] = useState(false);
    const [noteslist, setNoteslist] = useState(null);

    const collection = "notes";
    
    useEffect(() => {
        const unsub = db.collection(collection).orderBy("updatedAt", "desc").onSnapshot((snap) => {
            setNoteslist(snap.docs);
        })

        return () => {
            unsub()
        }
    }, [collection])

    const addNote = () => {
        setNewNote(!newNote);
    }

    const noteClickHandle = (doc) => {
        setEditor(true);
        setNoteDoc(doc);
        setNewNote(false);
    }


    const deleteHandle = (id) => {
        setEditor(false)
        db.collection(collection).doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <div className="notelist-container">
            <div className="form-container">
                <button onClick={() => addNote()} className={newNote ? "cancel-button" : "add-button"}>{newNote ? "X" : "+"}</button>
                {newNote && <Note setNewNote={setNewNote} setEditor={setEditor} setNoteDoc={setNoteDoc} />}
            </div>
            <div className="notes-container">
                {!noteslist && <div>Loading</div>}
                {
                    noteslist && noteslist.map((doc) => {
                        return (
                            <div className="notelist-note-container" key={doc.id}>
                                <p className="notelist-heading" onClick={() => noteClickHandle(doc)}>{doc.data().title}</p>
                                <button className="delete-button" onClick={() => deleteHandle(doc.id)}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NoteList;
