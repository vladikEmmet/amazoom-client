import { instance } from "@/api/interceptor";
import { IOrder } from "@/types/order.interface";

const ORDERS = "orders";

export const OrderService = {
    async getAll() {
        return await instance<IOrder[]>({
            url: ORDERS,
            method: "GET",
        });
    },
}
