import { useProfile } from "@/hooks/useProfile";
import { ReviewService } from "@/services/review.service";
import { IReview } from "@/types/review.interface";
import { useRouter } from "next/router";
import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating"
import Button from "../../Button/Button";
import Input from "../../Input/Input";

interface SendReviewProps {
    productId: number;
}

const SendReview: FC<SendReviewProps> = ({productId}) => {
    const {register, handleSubmit, formState: {errors}, control} = useForm<Pick<IReview, "text" | "rating">>({
        mode: "onSubmit"
    });
    const {profile} = useProfile();
    const router = useRouter();
    
    if(!profile) return null;

    const onSubmit:SubmitHandler<Pick<IReview, "text" | "rating">> = async(data) => {
        ReviewService.send(productId, data).then(r => router.push(router.asPath));
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 border-b-2 border-b-primary pb-5 mb-5">
            <Controller 
                control={control} 
                name="rating" 
                rules={{
                    required: "Category is required",
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => {
                    return (
                        <>
                            <Rating 
                                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                                showTooltip
                                onClick={(rate: number) => onChange(rate)}
                                initialValue={value}
                                SVGstyle={{display: "inline-block"}}
                                transition
                            />
                            {error && <p className="text-warning text-sm self-start">{error?.message}</p>}
                        </>
                    )
                }}
            />
            <Input 
                placeholder="Your comment..."
                withTitle={false}
                multiple
                error={errors.text?.message}
                {...register("text", {
                    maxLength: {
                        value: 60,
                        message: "Message must not be longer than 60 characters"
                    }
                })
                }
            />

            <Button variant="light" type="submit" className="ml-auto">Send</Button>
        </form>
    </div>
  )
}

export default SendReview