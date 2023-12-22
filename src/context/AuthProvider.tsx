import { createContext, useState, ReactNode, useEffect } from "react";
import { IUnauthenticated, User } from "../types/auth";
import { ApiError, DBUser } from "../client";

import useApi from "../hooks/useApi";

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

    const { UsersService } = useApi();

    useEffect(() => {
        async function getAuthentication() {
            const persistantUser: DBUser =
                await UsersService.getOrCreateDatabaseUser();
            setAuth({
                discordId: persistantUser.discord_id,
                avatarUrl: persistantUser.avatar_url ?? "",
                username: persistantUser.username,
                admin: persistantUser.is_admin ?? false,
                isAuthenticated: true,
            });
        }

        async function persistLogin() {
            try {
                getAuthentication();
            } catch (e) {
                if (e instanceof ApiError) {
                    console.log("Attempting to refresh session...");
                }
                try {
                    const refreshResponse = await UsersService.refresh();
                    console.log(refreshResponse);
                    if (refreshResponse.content == true) {
                        getAuthentication();
                    }
                } catch {
                    setAuth({ isAuthenticated: false });
                }
            }
        }

        if (auth.isAuthenticated == false) {
            persistLogin();
        }
    }, [UsersService, auth.isAuthenticated]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
