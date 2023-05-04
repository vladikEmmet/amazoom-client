import { getLocalStorage } from "@/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";
import { setTimeout } from "timers/promises";
import { checkAuth, login, logout, register } from "./user.actions";
import { IInitialState } from "./user.interface";

const initialState: IInitialState = {
    user: getLocalStorage("user"),
    isLoading: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, state => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user
        })
        .addCase(login.pending, state => {
            state.isLoading = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
        })
        .addCase(logout.fulfilled, state => {
            state.user = null;
            state.isLoading = false;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
        })
    },
});