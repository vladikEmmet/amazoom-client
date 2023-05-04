import { useAction } from "@/hooks/useAction";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { IEmailPassword } from "@/store/user/user.interface";
import { validEmail } from "@/utils/validEmail";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Loader from "../../UI/Loader";
import Meta from "../../UI/Meta";
import Title from "../../UI/Title";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { errorCatch } from "@/api/helper";
import { useAppDispatchUnwrap } from '@/hooks/useAppDispatchUnwrap';
import { login, register } from "@/store/user/user.actions";

enum PasswordTypes {
    PASSWORD = "PASSWORD",
    TEXT = "TEXT",
}

const Auth: FC = () => {
    useAuthRedirect();
    const {isLoading} = useAuth();
    const [type, setType] = useState<"login" | "register">("login");
    const {register: formReg, handleSubmit, formState: {errors}, reset} = useForm<IEmailPassword>({
        mode: "onChange"
    });
    const [error, setError] = useState("");
    const [passwordType, setPasswordType] = useState<PasswordTypes>(PasswordTypes.PASSWORD);
    const {setMessage} = useAction();
    const dispatch = useAppDispatchUnwrap();

    const onSubmit:SubmitHandler<IEmailPassword> = async(data) => {
        try {
            let action;
            if (type === "login") {
                dispatch(login(data)).catch((err: any) => setError(err));
            } else {
                dispatch(register(data)).catch((err: any) => setError(err));
            }
            reset();
        } catch(err) {
            console.log(err);
            
            setMessage(errorCatch(err));
        }
    }
    
    return (
        <Meta title="Authorization">
            <section className="flex h-screen">
                <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-white shadow-sm p-7 m-auto">
                    <Title className="capitalize text-center mb-4">{type === "login" ? "Log in" : "Registration"}</Title>

                    {isLoading && <Loader />}
                    
                    <Input {...formReg("email", {
                            required: "Email is required",
                            pattern: {
                                value: validEmail,
                                message: "Invalid email",
                            }
                        })}
                        placeholder="Email"
                        error={errors.email?.message}
                    />

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
                    />

                    {error.length > 0 && 
                        <p className="text-warning mb-3">{error}</p>
                    }

                    <div className="flex justify-around items-center">
                        <Button variant="dark">
                            Submit
                        </Button>

                        <button 
                            onClick={() => setType(type === "register" ? "login" : "register")}
                            className="inline-block opacity-50 mt-1"
                            type="button"
                        >
                            {type === "register" ? "Login" : "Sign up"}
                        </button>
                    </div>
                </form>
            </section>
            
        </Meta>
    )
}

export default Auth;