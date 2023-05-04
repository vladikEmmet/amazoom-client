import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const IInitialState = {
    message: "",
}

export const modalSlice = createSlice({
    name: "modal",
    initialState: IInitialState,
    reducers: {
        setMessage: (state, action: PayloadAction<unknown>) => {
            state.message = action.payload as string;
        },
        resetMessage: state => {
            state.message = "";
        },
    }
});