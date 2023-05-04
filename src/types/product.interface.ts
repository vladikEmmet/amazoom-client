import { ICategory } from "./category.interface";
import { IReview } from "./review.interface";

export interface IProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    createdAt: string;
    category: ICategory;
    reviews: IReview[];
    characteristics: ICharacteristic[];
}

export interface ICharacteristic {
    name: string;
    value: string;
}

export interface IProductDetails {
    product: IProduct;
}

export type TypeProducts = {
    products: IProduct[];
}

export type TypePaginationProducts = {
    length: number;
    products: IProduct[];
}

export type TypeProductWithClicks = {
    id: number;
    count: number;
    product: IProduct;
}