import { IUserState } from "@/store/user/user.interface";

export const getLocalStorage = (name: string) => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(name) || "{}");
    }
    return null;
}