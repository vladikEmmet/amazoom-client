import { axiosDefault, instance } from "@/api/interceptor";
import { ICategory } from "@/types/category.interface";
import { URL } from "@/utils/url";

export const CategoryService = {
    async getAll() {
        return await axiosDefault<ICategory[]>({
            url: URL.CATEGORIES,
            method: "GET",
        });
    },

    async getById(id: string | number) {
        return instance<ICategory>({
            url: `${URL.CATEGORIES}/${id}`,
            method: "GET",
        });
    },

    async getBySlug(slug: string) {
        return await axiosDefault<ICategory>({
            url: `${URL.CATEGORIES}/by-slug/${slug}`,
            method: "GET",
        });
    },

    async create(data: {name: string}) {
        return await instance<ICategory>({
            url: URL.CATEGORIES,
            method: "POST",
            data,
        });
    },

    async update(id: number | string, name: string) {
        return instance<ICategory>({
            url: `${URL.CATEGORIES}/${id}`,
            method: "PUT",
            data: {name},
        })
    },

    async delete(id: number | string) {
        return instance<ICategory>({
            url: `${URL.CATEGORIES}/${id}`,
            method: "DELETE",
        })
    }
}
