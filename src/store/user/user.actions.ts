import { errorCatch } from "@/api/helper";
import { AuthService } from "@/services/auth.service";
import { StorageService } from "@/services/storage.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthResponse, IEmailPassword, IUserRegister } from "./user.interface";

export const register = createAsyncThunk<IAuthResponse, IUserRegister>(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.main<IUserRegister>("register", data);
            return response;
        } catch(err) {
            return thunkAPI.rejectWithValue(errorCatch(err));
        }
    }
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
    "auth/login",
    async(data, thunkAPI) => {
        try {
            const response = await AuthService.main<IEmailPassword>("login", data);
            return response;
        } catch(err) {
            return thunkAPI.rejectWithValue(errorCatch(err));
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async() => {
    StorageService.removeTokensStorage();
    StorageService.removeUserFromStorage();
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
    "auth/refresh",
    async(_, thunkAPI) => {
        try {
            const response = await AuthService.getNewTokens();
            return response?.data;
        } catch(err) {
            if(errorCatch(err) === "jwt expired") thunkAPI.dispatch(logout());
            return thunkAPI.rejectWithValue(errorCatch(err));
        }
    }
)