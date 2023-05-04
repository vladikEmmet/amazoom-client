import { axiosDefault, instance } from "@/api/interceptor";
import { IReview } from "@/types/review.interface";
import { URL } from "@/utils/url";

type TypeData = {
    rating: number;
    text: string;
}

export const ReviewService = {
    async getAll() {
        return await axiosDefault<IReview[]>({
            url: URL.REVIEWS,
            method: "GET",
        });
    },

    async send(productId: string | number, data: TypeData) {
        return await instance<IReview>({
            url: `${URL.REVIEWS}/send/${productId}`,
            method: "POST",
            data,
        });
    },

    async getAverageProductRating(productId: string | number) {
        return await axiosDefault<number>({
            url: `${URL.REVIEWS}/average-by-product/${productId}`,
            method: "GET",
        })
    },

    async delete(id: string | number) {
        return await instance<IReview>({
            url: `${URL.REVIEWS}/${id}`,
            method: "DELETE",
        })
    }
}
