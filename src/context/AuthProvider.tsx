import { createContext, useState, ReactNode } from "react";
import { IUnauthenticated, User } from "../types/auth";
// import { Outlet } from "react-router-dom";

export interface IAuthContext {
    readonly auth: User;
    readonly setAuth: (auth: User) => void;
}

const initialAuth: IUnauthenticated = { isAuthenticated: false };

const initialContext: IAuthContext = {
    auth: initialAuth,
    setAuth: () => {
        throw new Error("Uninitialized Authentication Context");
    },
};

export const AuthContext = createContext<IAuthContext>(initialContext);

interface Props {
    readonly children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [auth, setAuth] = useState<User>(initialAuth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
