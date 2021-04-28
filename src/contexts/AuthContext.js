import { createContext, useReducer, useEffect } from "react";
import { auth } from '../firebase_config';

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "field":
            return { ...state, [action.field]: action.value}
        case "login":
            return { ...state, 
                isLoggedIn: true,
                isLoading: false,
                error: ''    
            }
        
    }
}

const AuthContextProvider = (props) => {

    const iniState = {
        email: '',
        password: '',
        isLoading: false,
        error: '',
        isLoggedIn: false
    }

    const [state, dispatch] = useReducer(AuthReducer, iniState);

    useEffect(() => {
        console.log(state);
    }, [state])

    return(
        <AuthContext.Provider value={{dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;