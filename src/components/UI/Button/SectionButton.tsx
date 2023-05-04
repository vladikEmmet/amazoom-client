import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import cn from "clsx";

interface SectionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean;
}

const SectionButton: FC<PropsWithChildren<SectionButtonProps>> = ({active, className, children, ...props}) => {
  return (
    <button 
        className={cn("block w-1/2 py-4", {
            "border-b-2 border-b-primary text-primary": active,
        }, className)} 
        {...props}
    >
        {children}
    </button>
  )
}

export default SectionButton