import './App.css';
import { useState, useContext } from 'react';
import NoteList from './components/NoteList';
// import useEditor from './hooks/useEditor';
import MyEditor from './components/MyEditor';
import ScreenContext from './contexts/ScreenContext';


function App() {

  
  const [ editor, setEditor ] = useState(false);
  const [ noteDoc, setNoteDoc ] = useState(null);

  const object = useContext(ScreenContext);
  // const {screenWidth, something} = object;
  console.log(object);
  // console.log(screenWidth);
  // console.log(something);
  return (
    <div>
      {/* <div className="App">
        <h1 className="notes-heading">MyNotes</h1>
        <div className="play-ground">
          {screenWidth > 1023 ? <div className="notelist-container-large">
                                  <NoteList setEditor={setEditor} setNoteDoc={setNoteDoc} />
                                </div>                          
                              : editor ? <div></div> : <div className="notelist-container-small">
                                                          <NoteList setEditor={setEditor} setNoteDoc={setNoteDoc} />
                                                        </div> 
          }
          {editor &&  <div className={screenWidth > 1023 ? "myeditor-container-large" : "myeditor-container-small"}>
                          <MyEditor noteDoc={noteDoc} screenWidth={screenWidth}  setEditor={setEditor} />
                      </div>
          }
        </div>
      </div> */}
    </div>
  );
}

export default App;
