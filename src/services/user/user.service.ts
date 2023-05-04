import { instance } from "@/api/interceptor";
import { IFullUser, IUser } from "@/types/user.interface";
import { UserData, USERS } from "./user.types";

export const UserService = {
    async getProfile() {
        return await instance<IFullUser>({
            url: `${USERS}/profile`,
            method: "GET",
        });
    },

    async update(data: UserData) {
        return instance<UserData, IUser>({
            url: `${USERS}/profile`,
            method: "PUT",
            data,
        });
    },

    async toggleFavorite(productId: number | string) {
        return instance<IUser>({
            url: `${USERS}/profile/favorites/${productId}`,
            method: "PATCH",
        })
    }
}
