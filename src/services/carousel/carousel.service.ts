import { axiosDefault, instance } from "@/api/interceptor"
import { ICarousel } from "@/types/carousel.interface"
import { URL } from "@/utils/url"
import { CarouselType } from "./carousel.types"

export const CarouselService = {
    async getCarousel(name: string) {
        return await axiosDefault<ICarousel>({
            method: "GET",
            url: `${URL.CAROUSEL}/${name}` 
        })
    },

    async update(data: CarouselType) {
        return await instance<ICarousel>({
            method: "PUT",
            url: `${URL.CAROUSEL}`,
            data,
        })
    },

    async getAll() {
        return await instance<ICarousel[]>({
            method: "GET",
            url: URL.CAROUSEL,
        })
    }
}