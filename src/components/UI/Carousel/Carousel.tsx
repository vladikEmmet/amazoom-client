import { useAction } from "@/hooks/useAction"
import { FC, useEffect, useMemo, useState } from "react"
import Arrow from "./Arrow";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import ImageGallery from 'react-image-gallery';
import { ICarouselImage, ICarouselItem } from "@/types/carousel.interface";
import cn from 'clsx';

interface CarouselProps {
    name: string;
    images?: ICarouselItem[];
    className?: string;
    showBullets?: boolean;
}

const Carousel: FC<CarouselProps> = 
({name, images = [], className = "", showBullets = false}) => {
    const items = images.length ? images : useCarousel(name).items;
    const mapedItems: ICarouselImage[] = useMemo(() => {
        return items.map((item) => ({
            original: item.image,
            loading: "lazy",
            originalAlt: item.title,
            originalClass: "main-carousel-img",
        }))
    }, [items])

    if(!items || items.length <= 0) return null;
    
    return (
        <div className={cn("w-full", className)}>
            {/* <Arrow 
                onClick={handlePrevClick} 
                className="absolute left-0 h-full"
            >
                <RxCaretLeft/>
            </Arrow>
           
            <Image 
                src={items[currentIndex]?.image}
                alt={items[currentIndex]?.title}
                width={500}
                height={200}
                className="w-full h-full"
            />
            <Arrow 
                onClick={handleNextClick} 
                className="absolute right-0 h-full"
            >
                <RxCaretRight />
            </Arrow> */}
            <ImageGallery 
                items={mapedItems}
                showPlayButton={false}
                autoPlay={true}
                slideInterval={5000}
                additionalClass="image-carousel-container"
                showThumbnails={false}
                showFullscreenButton={false}
                showBullets={showBullets}
                renderLeftNav={(onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, disabled: boolean) => 
                    <Arrow 
                        onClick={onClick}
                        disabled={disabled}
                        className="z-[8] left-0 outline-none text-white 
                        hover:text-[#337ab7] transition-all duration-300 font-bold"
                    >
                        <RxCaretLeft size={42}/>
                    </Arrow>
                }
                renderRightNav={(onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, disabled: boolean) => (
                    <Arrow 
                        onClick={onClick}
                        disabled={disabled}
                        className="z-[8] right-0 outline-none text-white 
                        hover:text-[#337ab7] transition-all duration-300 font-bold"
                    >
                        <RxCaretRight size={42} />
                    </Arrow>
                )}
            />
        </div>
    )
}

export default Carousel