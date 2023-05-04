import { ICartItem } from "./cart.interface";
import { IUser } from "./user.interface";

export enum OrderStatus {
    PENDING = "PENDING",
    DELIVERED = "DELIVERED",
    SHIPPED = "SHIPPED",
    PAYED = "PAYED",
}

export interface IOrder {
    id: number;
    createdAt: string;
    items: ICartItem[];
    status: OrderStatus;
    user: IUser;
}