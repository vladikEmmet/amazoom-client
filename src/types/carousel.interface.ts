export interface ICarouselItem {
    id: number;
    image: string;
    title: string;
}

export interface ICarousel {
    id: number;
    name: string;
    items: ICarouselItem[];
}

export interface ICarouselImage {
    original: string;
    loading: "lazy" | "eager";
    originalAlt: string;
}