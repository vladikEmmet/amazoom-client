import { URL } from "@/utils/url";

export type UserData = {
    email: string;
    password?: string;
    name?: string;
    avatarPath?: string;
    phone?: string;
}

export const USERS = URL.USERS;