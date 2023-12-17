export interface IAuthenticatedUser {
    readonly discordId: number;
    readonly avatarUrl: string;
    readonly username: string;
    readonly admin: boolean;
    readonly isAuthenticated: true;
}

export interface IUnauthenticated {
    readonly isAuthenticated: false;
}

export type User = IAuthenticatedUser | IUnauthenticated;
