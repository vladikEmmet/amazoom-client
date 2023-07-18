import Image from "next/image"
import { FC } from "react"

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

const Logo: FC<LogoProps> = ({width, height, className}) => {
  return (
    <Image 
        priority 
        width={width || 180} 
        height={height || 37} 
        src="https://blog.cengage.com/wp-content/uploads/2020/04/Amazon-logo-1110x380.jpg" 
        alt="Logo"
        className={className || ""}
    />
  )
}

export default Logo