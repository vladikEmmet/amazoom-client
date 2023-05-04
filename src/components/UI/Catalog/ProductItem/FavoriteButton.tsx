import { useProfile } from "@/hooks/useProfile";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ButtonHTMLAttributes, FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import cn from "clsx";

interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    productId: number;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({productId, className}) => {
    const {profile} = useProfile();
    const queryClient = useQueryClient();
    const {mutate} = useMutation(["toggle favorite"], () => UserService.toggleFavorite(productId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get profile"]);
        }
    });

    if(!profile) return null;
    
    const isExists = profile.favorites.some(f => f.id === productId);
    
  return (
    <div>
        <button 
            onClick={() => 
                mutate()
            }
            className={cn("text-primary outline-none", className)}
        >
            {isExists ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
    </div>
  )
}

export default FavoriteButton;