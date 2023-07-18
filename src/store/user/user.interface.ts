import { IUser } from "@/types/user.interface";

export enum UserRoles {
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface IUserState {
    email: string,
    role: UserRoles,
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IInitialState {
    user: IUserState | null;
    isLoading: boolean;
}

export interface IEmailPassword {
    email: string;
    password: string;
}

export interface IUserRegister extends IEmailPassword {
    number: string;
    phone: string;
    name: string;
}

export interface IAuthResponse extends ITokens {
    user: IUser & {
        role: UserRoles,
    }
}