import React, { useState, useEffect, createContext } from 'react';

export const ScreenContext = createContext();

const ScreenContextProvider = (props) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const updateScreen = () => {
        setScreenWidth(window.innerWidth)
    }
    
    useEffect(() => {
        window.addEventListener('resize', updateScreen);
        return () => window.removeEventListener('resize', updateScreen);
    }, []);

    return (
        <ScreenContext.Provider value={screenWidth}>
            { props.children }
        </ScreenContext.Provider>
    );
}

export default ScreenContextProvider;