import { IProduct } from "@/types/product.interface"
import { SizeEnum } from "@/types/size.enum";
import { FC, useState } from "react"
import { Rating } from "react-simple-star-rating"
import cn from "clsx";

interface ProductRatingProps {
    product: IProduct;
    size?: SizeEnum;
}

const ProductRating: FC<ProductRatingProps> = ({product, size=SizeEnum.SM}) => {
    const [rating, setRating] = useState(
        Math.round(
            product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
        ) || 0
    );
    
  return (
    <div className="mb-2 flex items-center">
        {
            !!product.reviews.length &&
            <span className="mr-1 flex items-center">
                <Rating
                    readonly
                    initialValue={rating}
                    SVGstyle={{display: "inline-block"}}
                    size={size === SizeEnum.SM ? 20 : size === SizeEnum.MD ? 30 : 40}
                    allowFraction
                    transition
                />

                <span 
                    style={{color: "#FFBC0D"}}
                    className={cn("ml-1 block", {
                        "text-sm": size === SizeEnum.SM,
                        "text-lg": size === SizeEnum.MD,
                        "text-2xl": size === SizeEnum.LG,
                    })}
                >
                    {rating}
                </span>
            </span>
        }
        <span className="text-xs">{`(${product.reviews.length} ${product.reviews.length === 1 ? "review" : "reviews"})`}</span>
    </div>
  )
}

export default ProductRating