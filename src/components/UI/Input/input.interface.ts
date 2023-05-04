import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    withTitle?: boolean;
    Icon?: IconType;
    error?: string;
    onIconClick?: () => void;
}