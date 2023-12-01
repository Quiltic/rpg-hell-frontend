import { createContext, useState, ReactNode } from "react";
// import { Outlet } from "react-router-dom";

type IAuthenticatedUser = {
    authToken: string
    discordId: string
    avatarUrl: string
    username: string
    admin: boolean
}

export type IAuthContext = {
    auth: IAuthenticatedUser
    setAuth: (auth: IAuthenticatedUser | object) => void
    persist: string,
    setPersist: (persist: string) => void

}

const AuthContext = createContext<IAuthContext | object>({});

export function AuthProvider(children: ReactNode) {
    const [auth, setAuth] = useState({});
    // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist') || '{}')); 
    // https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;