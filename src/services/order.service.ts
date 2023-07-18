import { instance } from "@/api/interceptor";
import { IOrder } from "@/types/order.interface";
import { URL } from "@/utils/url";

export const OrderService = {
    async getAll() {
        return await instance<IOrder[]>({
            url: URL.ORDERS,
            method: "GET",
        });
    },

    async placeOrder(data: IOrder) {
        const payment = await instance({
            url: URL.ORDERS,
            method: "POST",
            data,
        });

        
    }
}
