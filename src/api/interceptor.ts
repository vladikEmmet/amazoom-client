import { AuthService } from "@/services/auth.service";
import { StorageService } from "@/services/storage.service";
import axios from "axios";
import { errorCatch, getContentType } from "./helper";

const axiosOptions = {
    baseURL: process.env.SERVER_URL,
    headers: getContentType(),
}

export const instance = axios.create(axiosOptions);

export const axiosDefault = axios.create(axiosOptions);

instance.interceptors.request.use(async config => {
    const accessToken = StorageService.getAccessToken();

    if(config.headers && accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    
    return config;
})

instance.interceptors.response.use(config => config,
    async err => {
        const originalRequest = err.config;

        if((err?.response?.status === 401 ||
                errorCatch(err) === "jwt expired" ||
                errorCatch(err) === "jwt malformed" ||
                errorCatch(err) === "jwt must be provided")
                && err.config && !err.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await AuthService.getNewTokens();
                return instance.request(originalRequest);
            } catch(e) {
                if(errorCatch(e) === "jwt expired") {
                    StorageService.removeTokensStorage();
                }
            }
        }

        throw err;
    }
);

