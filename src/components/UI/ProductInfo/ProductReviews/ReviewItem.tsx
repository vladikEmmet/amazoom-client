import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { UserRoles } from "@/store/user/user.interface";
import { IReview } from "@/types/review.interface"
import { dateFormatter } from "@/utils/dateFormatter";
import Image from "next/image";
import { FC } from "react";
import { BsFillStarFill } from 'react-icons/bs'
import Button from "../../Button/Button";
import { BsFillTrashFill } from 'react-icons/bs'
import { SizeEnum } from "@/types/size.enum";
import { ReviewService } from "@/services/review.service";
import { useRouter } from "next/router";
import { useAction } from "@/hooks/useAction";

interface ReviewItemProps {
    review: IReview;
}

const ReviewItem: FC<ReviewItemProps> = ({review}) => {
    const {profile} = useProfile();
    const {user} = useAuth();
    const {setMessage} = useAction();
    const router = useRouter();

    const removeReview = async() => {
        try {
            const res = await ReviewService.delete(review.id);
            router.push(router.asPath);
        } catch(err) {
            setMessage(err);
        }
    }

  return (
    <div className="flex items-between w-full mb-10 relative">
        <div className="flex flex-col items-center justify-center mr-4 border-r border-r-warning pr-4">
            <Image 
                width={50} 
                height={50} 
                alt={`${review.user.name}'s avatar`}
                src={review.user.avatarPath}
                className="rounded-full"
            />
            <h1>{review.user.name || "Anonymus"}</h1>
        </div>
        <div className="w-full">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <span className="text-lg text-[#ffbc08]">{review.rating}</span>
                    <BsFillStarFill color="#ffbc08"/>
                </div>
                <span className="text-gray">{dateFormatter(review.createdAt)}</span>
            </div>
            <p>
                {review.text}
            </p>
        </div>
        {((profile && profile.id === review.user.id) 
            || (user?.role === UserRoles.ADMIN)) 
            && (
                <Button 
                    variant="light" 
                    size={SizeEnum.SM}
                    onClick={removeReview}
                    className="absolute right-0 bottom-0"
                >
                    <BsFillTrashFill />
                </Button>
            )}
    </div>
  )
}

export default ReviewItem