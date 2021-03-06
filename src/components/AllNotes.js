import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import { EditorContext } from "../contexts/EditorContext";
import { usersdb } from "../firebase_config";

const AllNotes = () => {

    const [isloading, setIsloading] = useState(false);

    const { authState } = useContext(AuthContext);
    const { editorDispatch } = useContext(EditorContext);

    const [data, setData] = useState(null);

    const iniNote = {
        title: '',
        content: '',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
    }

    const addNote = () => {
        usersdb.doc(authState.uid).collection("notes").add(iniNote).then((note) => {
            // console.log("success", note);
            editorDispatch({type: "new", id: note.id, createdAt: iniNote.createdAt, updatedAt: iniNote.updatedAt});
        }).catch((error) => {
            console.log(error)
        })
    } 

    const noteClick = (doc) => {
        editorDispatch({type: "note", title: doc.data().title, 
                        content: doc.data().content, 
                        id: doc.id, 
                        createdAt: doc.data().createdAt, 
                        updatedAt: doc.data().updatedAt});
    }

    const deleteNote = (doc) => {
        usersdb.doc(authState.uid).collection("notes").doc(doc.id).delete();
        editorDispatch({type: "back"})
    }

    useEffect(() => {
        setIsloading(true);
        const unsub = usersdb.doc(authState.uid).collection("notes")
        .orderBy("updatedAt", "desc")
        .onSnapshot((snap) => {
            setData(snap.docs);
            setIsloading(false);
        });
        return () => unsub();
    }, [authState.uid])


    return(
        <div>
            <button className="mx-auto w-100 btn btn-primary" style={{fontSize: "x-large"}} onClick={() => addNote()}>+</button>
            <div>
                {isloading && <p className="p-5">Loading...</p>}
                {data && data.map((doc) => {
                    var lastUpdated = '';
                    if((new Date() - new Date(doc.data().updatedAt))/1000 < 60) {
                        lastUpdated = ((new Date() - new Date(doc.data().updatedAt))/1000).toFixed() + ' seconds ago';
                    } else if((new Date() - new Date(doc.data().updatedAt))/1000 > 60 && (new Date() - new Date(doc.data().updatedAt))/1000 < 60*60) {
                        lastUpdated = ((new Date() - new Date(doc.data().updatedAt))/(1000*60)).toFixed() + ' minutes ago';
                    } else if((new Date() - new Date(doc.data().updatedAt))/1000 > 60*60 && (new Date() - new Date(doc.data().updatedAt))/1000 < 24*60*60) {
                        lastUpdated = ((new Date() - new Date(doc.data().updatedAt))/(1000*60*60)).toFixed() + ' hours ago';
                    } else if((new Date() - new Date(doc.data().updatedAt))/1000 > 24*60*60) {
                        lastUpdated = new Date(doc.data().updatedAt).toLocaleDateString();
                    } 
                    return(
                        <div key={doc.id} className="d-flex flex-row w-100 p-3 pb-1" style={{borderBottom: "solid 1px #d9d9d9"}}>
                            <div className="d-flex flex-column w-100" onClick={() => noteClick(doc)} style={{cursor: 'pointer'}}>
                                <h4 className="m-0">{doc.data().title ? doc.data().title : "Untitled"}</h4>
                                <p className="" style={{fontSize: "12px"}}><span>Last updated: </span>{lastUpdated}</p>
                            </div>
                            <button className="btn btn-danger my-auto" onClick={() => deleteNote(doc)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllNotes