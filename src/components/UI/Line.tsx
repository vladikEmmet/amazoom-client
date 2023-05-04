import { FC } from "react"
import cn from 'clsx'

const Line: FC<{className?: string}> = ({className}) => {
  return (
    <hr className={cn("h-1 w-full text-primary mt-3", className)}/>
  )
}

export default Line