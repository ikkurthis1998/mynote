import './App.css';
import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
// import useEditor from './hooks/useEditor';
import MyEditor from './components/MyEditor';

function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [ editor, setEditor ] = useState(false);
  const [ noteDoc, setNoteDoc ] = useState(null);

  useEffect(() => {
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, [])

  const updateScreen = () => {
    setScreenWidth(window.innerWidth)
  }
  
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
