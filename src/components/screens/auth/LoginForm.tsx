import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import { IEmailPassword } from "@/store/user/user.interface"
import { validEmail } from "@/utils/validEmail";
import { FC, useState } from "react"
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { AuthFormProps, PasswordTypes } from "./Auth.interface"
import Error from "./Error";

interface LoginFormProps extends AuthFormProps<IEmailPassword> {}

const LoginForm: FC<LoginFormProps> = ({onSubmit, error}) => {
    const {register: formReg, handleSubmit, formState: {errors}} = useForm<IEmailPassword>({
        mode: "onChange"
    });
    const [passwordType, setPasswordType] = useState<PasswordTypes>(PasswordTypes.PASSWORD);
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-white shadow-sm p-7 m-auto w-full auth-form">
        <div className="flex items-center">
            <MdOutlineEmail />
            <span>Email</span>
        </div>
            <Input 
                {...formReg("email", {
                    required: "Email is required",
                    pattern: {
                        value: validEmail,
                        message: "Invalid email",
                    }
                })}
                placeholder="Email"
                error={errors.email?.message}
                withTitle={false}
            />
        <div className="flex items-center">
            <HiOutlineLockClosed />
            <span>Password</span>
        </div>
            <Input {...formReg("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                    }
                })}
                type={passwordType}
                placeholder="Password"
                error={errors.password?.message}
                Icon={passwordType === PasswordTypes.PASSWORD ? AiFillEye : AiFillEyeInvisible}
                onIconClick={
                    () => setPasswordType(passwordType === PasswordTypes.PASSWORD ? 
                        PasswordTypes.TEXT : PasswordTypes.PASSWORD)
                }
                withTitle={false}
            />
        <Error error={error}/>
        <Button 
            variant="dark" 
            type="submit"
            className="mt-4"
        >
            Sign In
        </Button>
    </form>
  )
}

export default LoginForm