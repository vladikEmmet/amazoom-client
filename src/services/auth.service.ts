import { axiosDefault } from "@/api/interceptor";
import { IAuthResponse, IEmailPassword } from "@/store/user/user.interface";
import { URL } from "@/utils/url";
import Cookies from "js-cookie";
import { StorageService } from "./storage.service";

export const AuthService = {

    async main(type: "login" | "register", data: IEmailPassword) {
        const response = await axiosDefault<IAuthResponse>({
            url: `${URL.AUTH}/${type}`,
            method: "POST",
            data,
        });

        if(response.data.accessToken) StorageService.saveToStorage(response.data);

        return response.data;
    },
    
    async getNewTokens() {
        const refreshToken = Cookies.get("refreshToken");

        const response = await axiosDefault.post<string, {data: IAuthResponse}>(
        `${URL.AUTH}/refresh`, {refreshToken});

        if(response.data.accessToken) StorageService.saveToStorage(response.data);

        return response;
    },
}
