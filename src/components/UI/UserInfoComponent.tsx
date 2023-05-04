import { IStatisticMain } from "@/types/statictic.interface"
import { FC } from "react"
import Loader from "./Loader";
import cn from 'clsx'

interface UserInfoProps {
    info: IStatisticMain[];
    isLoading: boolean
}

const UserInfo: FC<UserInfoProps> = ({info, isLoading}) => {
    if(isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader bg="transparent"/>
            </div>
        )
    }
    
  return (
    <div className="flex flex-col items-center justify-between">
        {info && info.length > 0 ? (
            info.map((item, index) => (
                <div
                    className={cn("flex items-center justify-between w-full mt-10 px-3 pt-5", {
                        "border-t border-gray-300": index !== 0
                    })} 
                    key={item.name}
                >
                    <h1 className="text-2xl font-bold">{item.name === "Products" ? "Favorites" : item.name}</h1>
                    <h1 className="text-2xl font-bold">{item.value}</h1>
                </div>
            ))
        ) : (
            <h1 className="text-2xl font-bold text-center mt-10">No info</h1>
        )}
    </div>
  )
}

export default UserInfo