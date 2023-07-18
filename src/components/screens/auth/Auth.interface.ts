import { FieldValues, SubmitHandler } from "react-hook-form";

export enum PasswordTypes {
    PASSWORD = "password",
    TEXT = "text",
}

export enum AuthTypes {
    LOGIN = "login",
    REGISTER = "register",
    RESET_PASSWORD = "reset password",
}

export interface AuthProps {
    onClose: () => void;
}

export interface AuthFormProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>;
    error: string;
}