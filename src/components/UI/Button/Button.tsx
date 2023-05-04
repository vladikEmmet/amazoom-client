import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import cn from "clsx";
import { SizeEnum } from "@/types/size.enum";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "dark" | "light";
    size?: SizeEnum;
}

const Button: FC<PropsWithChildren<ButtonProps>> = 
({children, className, variant, size=SizeEnum.MD, ...props}) => {
    return (
        <button 
            {...props} 
            className={cn(
                `rounded-xl font-medium
                shadow px-10 py-2 outline-none
                md:hover:shadow-lg lg:hover:shadow-lg transition duration-300 ease-in-out`, 
                {
                    "text-white bg-primary": variant === "dark",
                    "text-primary bg-white": variant === "light",
                    "px-5 py-2 text-sm": size === SizeEnum.SM,
                    "px-16 py-7 text-lg": size === SizeEnum.LG,
                }, 
            className)}
        >
            {children}
        </button>
    )
}

export default Button;