import { useAction } from "@/hooks/useAction";
import { useAuth } from "@/hooks/useAuth";
import { IEmailPassword, IUserRegister } from "@/store/user/user.interface";
import { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Button from "../../UI/Button/Button";
import Loader from "../../UI/Loader";
import { errorCatch } from "@/api/helper";
import { useAppDispatchUnwrap } from '@/hooks/useAppDispatchUnwrap';
import { login, register } from "@/store/user/user.actions";
import Modal from "@/components/UI/Modal/Modal";
import Logo from "@/components/UI/Logo";
import Title from "@/components/UI/Title";
import { AuthProps, AuthTypes } from "./Auth.interface";
import RegistrationForm from "./RegistrationForm";
import ResetPassword from "./ResetPassword";
import LoginForm from "./LoginForm";

const Auth: FC<AuthProps> = ({onClose}) => {
    const {isLoading} = useAuth();
    const [type, setType] = useState<AuthTypes>(AuthTypes.LOGIN);
    const [error, setError] = useState("");
    const {setMessage} = useAction();
    const dispatch = useAppDispatchUnwrap();

    const onSubmit:SubmitHandler<IEmailPassword | IUserRegister> = async(data) => {
        try {
            if (type === "login") {
                dispatch(login(data as IEmailPassword)).catch((err: any) => setError(err));
            } else {
                dispatch(register(data as IUserRegister)).catch((err: any) => setError(err));
            }
        } catch(err) {
            setMessage(errorCatch(err));
        }
    }

    const onGoBack = () => setType(AuthTypes.LOGIN);

    if(isLoading) return (
        <Modal onClose={onClose}>
            <Loader bg="transparent"/>
        </Modal>
    )
    
    return (
        <Modal 
            onClose={onClose}
            className="w-2/3"
        >
            <Logo className="mb-5"/>

            {type === AuthTypes.RESET_PASSWORD ? (
                <ResetPassword onGoBack={onGoBack}/>
            ) : (

                <div className="w-full flex justify-between">
                    <div className="w-3/5">
                        <Title className="text-center mb-2">{type === AuthTypes.LOGIN ? "Sign in" : "Create account"}</Title>
                        {type === AuthTypes.LOGIN ? <LoginForm onSubmit={onSubmit} error={error}/> : <RegistrationForm  onSubmit={onSubmit} error={error}/>}
                    </div>
                    <div className="w-2/5 text-center text-sm flex flex-col justify-around items-center">
                        <p>
                            {`Find everything you love at Amazoom
                            The world's largest onle merietalace `}
                        </p>
                        <div className="w-full">
                            <p>{type === AuthTypes.LOGIN ? "New in Amazoom?" : "Already have an account?"}</p>
                            <Button
                                variant="dark"
                                onClick={() => setType(type === AuthTypes.LOGIN ? AuthTypes.REGISTER : AuthTypes.LOGIN)}
                                className="mt-4 text-base"
                            >
                                {type === AuthTypes.REGISTER ? "Sign In" : "Create your account here"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            
        </Modal>
    )
}

export default Auth;