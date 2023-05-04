import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./useAuth"

export const useAuthRedirect = () => {
    const {user} = useAuth();
    const {replace} = useRouter();
    
    useEffect(() => {
        if(user && Object.keys(user).length !== 0) {
            console.log("redirect");
            console.log(user);
            replace("/");
        }
    }, [user])
}