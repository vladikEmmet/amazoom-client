import { useTypedSelector } from "./useTypedSelector";

export const useCart = () => {
    const items = useTypedSelector(state => state.cart.items);
    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);  

    return {items, total}
};