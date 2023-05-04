import { FC, HTMLAttributes } from "react";
import cn from "clsx";

interface RowProps {
    name: string;
    value: string;
}

const Row: FC<RowProps & HTMLAttributes<HTMLDivElement>> = ({name, value, className}) => {
  return (
    <div className={cn("flex w-full h-20", className)}>
        <div 
            className="w-1/2 text-center text-md flex items-center justify-center border-r border-r-black"
        >
            {name}
        </div>
        <div 
            className="w-1/2 text-center text-md flex items-center justify-center"
        >
            {value}
        </div>
    </div>
  )
}

export default Row