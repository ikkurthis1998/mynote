import React, { createContext, useReducer } from 'react';

export const EditorContext = createContext();

const EditorReducer = (editorState, action) => {
    switch (action.type) {
        case "field":
            return { ...editorState, [action.field]: action.value}
        
        case "new":
            return {
                ...editorState,
                editor: true,
                createdAt: action.createdAt,
                updatedAt: action.updatedAt,
                id: action.id
            }

        case "back":
            return {
                title: '',
                content: '',
                id: '',
                createdAt: '',
                updatedAt: '',
                editor: false
            }
        
        case "note":
            return {
                title: action.title,
                content: action.content,
                id: action.id,
                createdAt: action.createdAt,
                updatedAt: action.updatedAt,
                editor: true
            }

        default: 
            return;
    }
}

const EditorContextProvider = (props) => {

    const iniState = {
        title: '',
        content: '',
        id: '',
        createdAt: '',
        updatedAt: '',
        editor: false
    }

    const [editorState, editorDispatch] = useReducer(EditorReducer, iniState);

    return (
        <EditorContext.Provider value={{editorState, editorDispatch}}>
            { props.children }
        </EditorContext.Provider>
    );
}

export default EditorContextProvider;