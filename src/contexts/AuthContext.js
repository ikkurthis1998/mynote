import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const AuthReducer = (authState, action) => {
    switch (action.type) {
        case "field":
            return { ...authState, [action.field]: action.value}
        
        case "login":
            return { ...authState, 
                isLoggedIn: true,    
            }
        
        case "signup":
            return { ...authState, 
                isLoggedIn: true,
            }
            
        default: 
            break;
    }
}

const AuthContextProvider = (props) => {

    const iniState = {
        email: '',
        password: '',
        confirmPassword: '',
        isLoggedIn: false
    }

    const [authState, dispatch] = useReducer(AuthReducer, iniState);

    useEffect(() => {
        // console.log(authState.error);
    }, [authState])

    return(
        <AuthContext.Provider value={{authState, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;