import { createContext, useState, ReactNode } from "react";
// import { Outlet } from "react-router-dom";

interface IAuthenticatedUser {
    readonly discordId: string;
    readonly avatarUrl: string;
    readonly username: string;
    readonly admin: boolean;
    readonly isAuthenticated: true;
}

interface IUnauthenticated {
    readonly isAuthenticated: false;
}

type User = IAuthenticatedUser | IUnauthenticated;

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
