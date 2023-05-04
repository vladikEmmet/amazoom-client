export const PRODUCTS = "products";

export type TypeProductData = {
    name: string;
    price: number;
    description?: string;
    characteristics?: TypeCharacteristics[];
    images: string[];
    categoryId: number;
}

export type TypeCharacteristics = {
    id?: number;
    name: string;
    value: string;
}

export type TypeDataFilter = {
    sort?: ProductSort;
    searchTerm?: string;
    page?: string | number;
    limit?: string | number;
}

export enum ProductSort {
    HIGHT_PRICE = "Hight price",
    LOW_PRICE = "Low price",
    NEWEST = "Newest",
    OLDEST = "Oldest",
}