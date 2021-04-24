import { useState, useEffect } from 'react';

const useEditor = (boolean) => {

    const [editor, setEditor] = useState(false);

    // setEditor(boolean);

    useEffect(() => {
        setEditor(boolean)
        // return () => {
            
        // }
    }, [boolean])

    return {editor, setEditor};
    
}

export default useEditor;