import { ITokens, IAuthResponse } from "@/store/user/user.interface";
import { IUser } from "@/types/user.interface";
import Cookies from "js-cookie";

export const StorageService = {
    saveTokensStorage: (data: ITokens) => {
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("refreshToken", data.refreshToken);
    },

    removeTokensStorage: () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        localStorage.removeItem("user");
    },

    saveToStorage: (data: IAuthResponse) => {
        StorageService.saveTokensStorage(data);
        localStorage.setItem("user", JSON.stringify(data.user));
    },

    saveUserToStorage: (data: IUser) => {
        localStorage.setItem("user", JSON.stringify(data));
    },

    getAccessToken: () => {
        const accessToken = Cookies.get("accessToken");
        return accessToken || null;
    },

    getRefreshToken: () => {
        const refreshToken = Cookies.get("refreshToken");
        return refreshToken || null;
    },

    getUserFromStorage: () => {
        return JSON.parse(localStorage.getItem("user") || "{}");
    },

    removeUserFromStorage: () => {
        localStorage.removeItem("user");
    }
}
