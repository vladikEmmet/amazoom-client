import React, { forwardRef } from 'react'
import { InputProps } from './input.interface'
import cn from 'clsx'

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({placeholder, type = "text", error, 
    className, style, Icon, withTitle=true,
    onIconClick, ...props}, ref) => {
        
  return (
    <div style={style} className={cn("mb-4 input relative", className)}>
        <label>
            <span className="block mb-1">
                {
                    withTitle && <span>{placeholder}</span>
                }
            </span>
            <div className="flex items-center">
                <input 
                    type={type} 
                    ref={ref} 
                    placeholder={placeholder}
                    {...props} 
                    className={cn(`px-4 py-2 w-full outline-none
                    focus:border-primary border border-gray border-solid 
                    transition-all placeholder:text-gray rounded-lg`, {
                        "border border-warning": error,
                    })}
                />
                {Icon && 
                    <Icon 
                        className="ml-3"
                        onClick={onIconClick}
                        fontSize={24}
                    />
                }
            </div>
        </label>
        {
            error && 
            <div className="text-warning mt-1 text-sm">{error}</div>
        }
    </div>
  )
})

Input.displayName = "Field";

export default Input