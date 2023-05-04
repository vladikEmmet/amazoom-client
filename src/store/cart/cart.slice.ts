import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICartInitialState, IAddToCartPayload, IChangeQuantityPayload } from "./cart.types";

const initialState: ICartInitialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
            const isExist = state.items.some(i => i.product.id === action.payload.product.id);

            if(!isExist) {
                state.items.push({...action.payload, id: state.items.length});
            }
        },
        removeFromCart: (state, action: PayloadAction<{id: number}>) => {
            state.items = state.items.filter(i => i.id !== action.payload.id);
        },
        changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
            const {id, type} = action.payload;
            const item = state.items.find(i => i.id === id);
            if(item) type === "plus" ? item.quantity++ : item.quantity--;
        },
        reset: state => {
            state.items = [];
        }
    }
})