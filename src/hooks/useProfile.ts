import { errorCatch } from "@/api/helper";
import { UserService } from "@/services/user/user.service"
import { IUser } from "@/types/user.interface";
import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth";

export const useProfile = () => {
    const {user} = useAuth();
    const {data} = useQuery(["get profile"], () => UserService.getProfile(), {
        select: ({data}) => data,
        onError: (err) => console.log(errorCatch(err)),
        enabled: !!user,
    });

    return {profile: data};
}