import Button from "../../Button/Button"
import { GoSearch } from 'react-icons/go'
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { SizeEnum } from "@/types/size.enum";
import { URL } from "@/utils/url";

const Search = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const onEnterDown = (ev: KeyboardEvent) => {
            if (ev.key === "Enter" && searchValue.length > 0) {
                router.push(`/${URL.SEARCH}${searchValue}`);
            }
        }

        document.addEventListener("keydown", onEnterDown);
        return () => document.removeEventListener("keydown", onEnterDown);
    })
    
  return (
    <div className="rounded-lg ml-4 overflow-hidden flex w-full">
        <input 
            type="text" 
            placeholder="Search..." 
            className="w-[50%] text-sm pl-4 outline-none text-white bg-black"
            onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button 
            variant="dark" 
            size={SizeEnum.SM}
            className="rounded-l-none" 
            onClick={() => router.push(`/${URL.SEARCH}${searchValue}`)}
        >
            <GoSearch />
        </Button>
    </div>
  )
}

export default Search