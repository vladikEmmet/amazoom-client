import { useAuth } from "@/hooks/useAuth"
import { UserRoles } from "@/store/user/user.interface";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react"
import { TypeComponentAuthProps } from "./auth-page.types"

const CheckRole: FC<PropsWithChildren<TypeComponentAuthProps>> = 
({Component: {isOnlyUser, isOnlyAdmin}, children}) => {
    const {user} = useAuth();
    const router = useRouter();
    
    if(isOnlyAdmin) {
        if(user?.role === UserRoles.ADMIN) {
            return <>{children}</>
        } else {
            router.replace("/");
            return null;
        }
    }
    if(user && isOnlyUser) return <>{children}</>
    
    router.pathname !== "/auth" && router.replace("/auth");
    return null;
}

export default CheckRole