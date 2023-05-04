import { FC, PropsWithChildren } from "react";
import cn from "clsx";

interface TitleProps {
    className?: string;
}

const Title: FC<PropsWithChildren<TitleProps>> = ({children, className}) => {
    return (
        <h1 className={cn("font-semibold text-3xl", className)}>
            {children}
        </h1>
    )
}

export default Title