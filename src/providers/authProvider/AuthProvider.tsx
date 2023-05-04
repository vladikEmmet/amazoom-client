import { useAction } from "@/hooks/useAction";
import { useAuth } from "@/hooks/useAuth";
import { StorageService } from "@/services/storage.service";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { TypeComponentAuthProps } from "./auth-page.types";

const CheckRoke = dynamic(() => import("./CheckRole"), {ssr: false});

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthProps>> = ({Component: {isOnlyUser, isOnlyAdmin}, children}) => {
    const {user} = useAuth();
    const {checkAuth, logout} = useAction();
    const {pathname} = useRouter();

    useEffect(() => {
        const accessToken = StorageService.getAccessToken();
        if(accessToken) checkAuth();
    }, [])

    useEffect(() => {
        const refreshToken = StorageService.getRefreshToken();
        if(!refreshToken && user) logout();
    }, [pathname])

    if(isOnlyAdmin) {
        return <CheckRoke Component={{isOnlyAdmin}}>{children}</CheckRoke>
    }
    
    return isOnlyUser ? 
    (<CheckRoke Component={{isOnlyUser}}>
        {children}
    </CheckRoke>) : 
    (<>{children}</>);
}

export default AuthProvider;