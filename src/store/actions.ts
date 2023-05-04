import * as userActions from "./user/user.actions";
import { cartSlice } from "./cart/cart.slice";
import { modalSlice } from "./modal/modal.slice";
import { carouselSlice } from "./carousel/carousel.slice";

export const rootActions = {
    ...userActions,
    ...cartSlice.actions,
    ...modalSlice.actions,
    ...carouselSlice.actions,
}