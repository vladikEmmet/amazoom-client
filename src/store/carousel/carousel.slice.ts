import { ICarouselItem } from "@/types/carousel.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICarouselInitalState } from "./carousel.types";

const initialState: ICarouselInitalState = {
    items: [],
}

export const carouselSlice = createSlice({
    name: "carousel",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<ICarouselItem[]>) => {
            state.items = action.payload;
        },
        // addItem: (state, action: PayloadAction<ICarouselItem>) => {
        //     state.items.push(action.payload);
        // },
        // removeItem: (state, action: PayloadAction<number>) => {
        //     state.items = state.items.filter(item => item.id !== action.payload);
        // }
    }
});