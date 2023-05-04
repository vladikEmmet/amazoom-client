import { axiosDefault, instance } from "@/api/interceptor";
import { IProduct, TypePaginationProducts } from "@/types/product.interface";
import { PRODUCTS, TypeProductData, TypeDataFilter } from "./product.types";

export const ProductService = {
    async getAll(queryData = {} as TypeDataFilter) {
        const {data} = await axiosDefault<TypePaginationProducts>({
            url: PRODUCTS,
            method: "GET",
            params: queryData,
        });
        
        return data;
    },

    async getSimilar(id: string | number,) {
        return await axiosDefault<IProduct[]>({
            url: `${PRODUCTS}/similar/${id}`,
            method: "GET",
        });
    },

    async getBySlug(slug: string) {
        return await axiosDefault<IProduct>({
            url: `${PRODUCTS}/by-slug/${slug}`,
            method: "GET",
        });
    },

    async getByCategory(categorySlug: string) {
        return axiosDefault<IProduct>({
            url: `${PRODUCTS}/by-category/${categorySlug}`,
            method: "GET",
        })
    },

    async getById(id: string | number) {
        return await instance<IProduct>({
            url: `${PRODUCTS}/${id}`,
            method: "GET",
        });
    },

    async create(data: TypeProductData) {
        return instance<IProduct>({
            url: PRODUCTS,
            method: "POST",
            data,
        });
    },

    async update(id: number | string, data: TypeProductData) {
        return instance<IProduct>({
            url: `${PRODUCTS}/${id}`,
            method: "PUT",
            data,
        });
    },

    async delete(id: number | string) {
        return instance<IProduct>({
            url: `${PRODUCTS}/${id}`,
            method: "DELETE",
        });
    }
}
