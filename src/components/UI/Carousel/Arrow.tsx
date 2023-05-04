import { ButtonHTMLAttributes, FC } from "react"
import cn from 'clsx'

const Arrow: FC<ButtonHTMLAttributes<HTMLButtonElement>> = 
({className, onClick, children, ...props}) => {
  return (
    <div>
        <button
            onClick={onClick}
            className={cn
                ("border-none bg-transparent p-5 absolute top-[50%] translate-y-[-50%]", 
                className)}
            {...props}
        >
            {children}
        </button>
    </div>
  )
}

export default Arrow