import { errorCatch } from "@/api/helper";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import { AuthService } from "@/services/auth.service";
import { validEmail } from "@/utils/validEmail";
import { FC, useState } from "react";
import { GoMail } from 'react-icons/go'
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { IoArrowBackOutline } from 'react-icons/io5';

interface ResetPasswordProps {
    onGoBack: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({onGoBack}) => {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    
    const onSubmit = async() => {
        try {
            if(!validEmail.test(email)) {
                setEmailError("It isn`t email. Please, try again");
            }
            await AuthService.resetPassword(email);
        } catch(err) {
            setError(errorCatch(err));
        }
    } 
    
  return (
    <div className="flex flex-col items-center justify-center relative">
        <button className="absolute left-4" onClick={onGoBack}>
            <IoArrowBackOutline/>
        </button>
        {(email.length <= 0) ? (
            <form onSubmit={onSubmit}>
                <Input 
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                {emailError && 
                    <p className="text-warning">{emailError}</p>
                }
                <Button type="submit" variant="dark">Continue</Button>
            </form>
        ) : (
            (error && error.length) ? (
                <>
                    <HiOutlineEmojiSad size={48}/>
                    <p>
                        {`Something went wrong: ${error}`}
                    </p>
                </>
            ) : (
                <>
                    <GoMail size={48}/>
                    <p>
                        {`We sent a new password to your email (${email}). Please, change it after log in`}
                    </p>
                </>
            )
        )}
    </div>
  )
}

export default ResetPassword