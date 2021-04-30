import { createContext, useReducer, useEffect } from "react";
import { auth } from '../firebase_config';

export const AuthContext = createContext();

const AuthReducer = (authState, action) => {
    switch (action.type) {
        case "field":
            return { ...authState, [action.field]: action.value}
        
        case "currentUser":
            return {
                ...authState,
                displayName: action.displayName,
                isLoggedIn: action.isLoggedIn,
                uid: action.uid,
                email: action.email
            }
        
        case "guest":
            return {
                displayName: 'Sam',
                email: 'sam@mynote.com',
                password: 'sam@mynote',
                confirmPassword: 'sam@mynote',
                uid: '8qZQkXZ8FASWgLvs1DamKd5Eqzi1',
                isLoggedIn: true
            }
            
        default: 
            return;
    }
}

const AuthContextProvider = (props) => {

    const iniState = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        uid: '',
        isLoggedIn: false
    }

    const [authState, dispatch] = useReducer(AuthReducer, iniState);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                dispatch({type: "currentUser", displayName: user.displayName, uid: user.uid, email: user.email, isLoggedIn: true})
            }
            // console.log(user.uid)
            // console.log(authState)
        })
    }, [])

    return(
        <AuthContext.Provider value={{authState, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;