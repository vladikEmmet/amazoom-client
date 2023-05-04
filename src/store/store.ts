import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { carouselSlice } from "./carousel/carousel.slice";
import { cartSlice } from "./cart/cart.slice";
import { modalSlice } from "./modal/modal.slice";
import { userSlice } from "./user/user.slice";

const persistConfig = {
    key: "amazoom",
    storage,
    whitelist: ["cart"],
};

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    carousel: carouselSlice.reducer,
    user: userSlice.reducer,
    modal: modalSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type TypeRootState = ReturnType<typeof rootReducer>