import { instance } from "@/api/interceptor";
import { TypeProductWithClicks } from "@/types/product.interface";
import { IStatisticMain } from "@/types/statictic.interface";
import { URL } from "@/utils/url";

export const StatisticsService = {
    async getMain(id: string | number) {
        return await instance<IStatisticMain[]>({
            url: `${URL.STATISTICS}/main/${id}`,
            method: "GET",
        })
    },

    async getTop() {
        return await instance<TypeProductWithClicks[]>({
            url: `${URL.STATISTICS}/top-products`,
            method: "GET",
        })
    },
}
