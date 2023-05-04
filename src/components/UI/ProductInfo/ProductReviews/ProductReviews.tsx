import { IReview } from "@/types/review.interface"
import { FC } from "react";
import Title from "../../Title";
import ReviewItem from "./ReviewItem";
import SendReview from "./SendReview";

interface ProducxtReviewsProps {
    reviews: IReview[];
    productId: number;
}

const ProductReviews: FC<ProducxtReviewsProps> = ({productId, reviews}) => {
  return (
    <div>
        <SendReview productId={productId}/>
        {reviews?.length ? (
            <>
                {reviews.map(review => 
                <ReviewItem review={review} key={review.id}/>
            )}
            </>
        ) : (
            <div>
                <Title>{"There is no reviews yet :("}</Title>
                <p>Be the first!</p>
            </div>
        )}
    </div>
  )
}

export default ProductReviews