import { IOrder } from "./order.interface";
import { IProduct } from "./product.interface";

export interface IUser {
    id: number;
    name: string;
    email: string;
    avatarPath: string;
    phone: string;
}

export interface IFullUser extends IUser {
    favorites: IProduct[];
    order: IOrder[];
}

export interface IFullUserWithPassowrd extends IFullUser {
    password: string;
}