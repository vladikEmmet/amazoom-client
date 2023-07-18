import Button from "@/components/UI/Button/Button"
import Input from "@/components/UI/Input/Input"
import { IUserRegister } from "@/store/user/user.interface"
import { validEmail } from "@/utils/validEmail"
import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiOutlinePhone, HiOutlineLockClosed } from "react-icons/hi2"
import { MdPersonOutline, MdOutlineEmail } from "react-icons/md"
import PhoneInput from "react-phone-input-2"
import { AuthFormProps, PasswordTypes } from "./Auth.interface"
import Error from "./Error"
import 'react-phone-input-2/lib/style.css'

interface RegistrationFormProps extends AuthFormProps<IUserRegister> {}

const RegistrationForm: FC<RegistrationFormProps> = ({onSubmit, error}) => {
  const {register: formReg, handleSubmit, formState: {errors}, control} = useForm<IUserRegister>({
    mode: "onChange"
  });
  const [passwordType, setPasswordType] = useState<PasswordTypes>(PasswordTypes.PASSWORD)
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-white shadow-sm p-7 m-auto w-full auth-form">
      <div className="flex items-center">
          <MdPersonOutline />
          <span>Full Name</span>
      </div>
      <Input 
        {...formReg("name", {
            minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
            },
            maxLength: {
                value: 40,
                message: "Too long name. Max length: 40 character",
            },
        })}
        type="text"
        placeholder="Tom Jackson"
        withTitle={false}
        error={(errors as any)?.name?.message}
      />
      <div className="flex items-center">
          <HiOutlinePhone />
          <span>Phone Number</span>
      </div>
      <Controller
          name="phone"
          control={control}
          render={({field: {value, onChange}, fieldState: {error}}) => {
              return (
                <>
                  <PhoneInput
                      onChange={(e) => {
                          onChange(e);
                      }}
                      autoFormat={true}
                      value={value}
                      specialLabel=""
                      inputClass="form-control"
                      containerClass="form-group"
                      buttonClass="btn btn-outline-secondary"
                      dropdownClass="dropdown-menu"
                      country={"us"}
                      inputProps={{
                          name: "phone",
                      }}

                  />
                  {error && (
                      <p className="text-warning text-sm self-start">
                          {error?.message}
                      </p>
                  )}
                </>
              );
          }}
      />
      <div className="flex items-center">
          <MdOutlineEmail />
          <span>Email</span>
      </div>
      <Input 
        {...formReg("email", {
            required: "Email is required",
            pattern: {
                value: validEmail,
                message: "Invalid email"
            }
        })}
        placeholder="amazoom.pet@gmail.com"
        withTitle={false}
        error={errors.email?.message}
      />
      <div className="flex items-center">
          <HiOutlineLockClosed />
          <span>Password</span>
      </div>
      <Input 
        {...formReg("password", {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
            }
        })}
        type={passwordType}
        placeholder="Enter your password"
        withTitle={false}
        Icon={passwordType === PasswordTypes.PASSWORD ? AiFillEye : AiFillEyeInvisible}
        onIconClick={() => 
          setPasswordType(passwordType === PasswordTypes.PASSWORD ? 
            PasswordTypes.TEXT : PasswordTypes.PASSWORD)
        }
        error={errors.password?.message}
      />
      <Error error={error}/>
      <Button variant="dark" type="submit" className="mt-4">Continue</Button>
    </form>
  )
}

export default RegistrationForm;