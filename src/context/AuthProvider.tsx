import { createContext, useState, ReactNode } from "react";
// import { Outlet } from "react-router-dom";

const AuthContext = createContext({});

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist') || '{}')); 
    // https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;