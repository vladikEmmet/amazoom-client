import { errorCatch } from "@/api/helper";
import { CarouselService } from "@/services/carousel/carousel.service";
import { useQuery } from "@tanstack/react-query";
import { useAction } from "./useAction";
import { useTypedSelector } from "./useTypedSelector";

export const useCarousel = (name: string) => {
    const {setItems} = useAction();

    const {data} = useQuery(["get carousel"], () => CarouselService.getCarousel(name), {
        select: ({data}) => data,
        onError: (err) => console.log(errorCatch(err)),
    });

    const {items} = useTypedSelector(state => state.carousel)

    if(!data) return {items};

    setItems(data.items);
    
    return {items: data.items};
};