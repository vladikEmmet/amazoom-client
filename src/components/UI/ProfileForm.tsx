import { IUser } from "@/types/user.interface"
import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input/Input";
import {validEmail} from "@/utils/validEmail";
import PhoneInput from "react-phone-input-2";
import Button from "./Button/Button";
import { SizeEnum } from "@/types/size.enum";
import { UserService } from "@/services/user/user.service";
import 'react-phone-input-2/lib/style.css'
import { useAction } from "@/hooks/useAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ProfileFormProps {
    user: IUser;
    hideForm: () => void;
    isPhotoEditing: boolean;
}

const ProfileForm: FC<ProfileFormProps> = ({user, hideForm, isPhotoEditing}) => {
    const {register, handleSubmit, formState: {errors}, control} = useForm<IUser>({
        mode: "onChange",
    })
    const {setMessage} = useAction();
    const queryClient = useQueryClient();

    const {mutate} = useMutation(["get profile"], () => UserService.getProfile(), {
        onSuccess: () => {
            queryClient.invalidateQueries(["get profile"]);
        }
    });

    const onSubmit: SubmitHandler<IUser> = async(data) => {
        try {
            await UserService.update(data);
            hideForm();
            mutate();
            setMessage("Profile updated successfully");
        } catch(err) {
            setMessage(err);
        }
    }
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {isPhotoEditing && 
                <Input
                    {...register("avatarPath", {
                        required: "Avatar is required",
                        pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Avatar must be a url using https protocol",
                        }
                    })}
                    error={errors.avatarPath?.message}
                    placeholder="Enter avatar url"
                />
        }
        <Input 
            {...register("email", {
                required: "Email is required",
                pattern: {
                    value: validEmail,
                    message: "Email must be an email",
                }
            })}
            error={errors.email?.message}
            placeholder="Email"
            type="email"
            defaultValue={user.email}
        />
        <Controller
            name="phone"
            control={control}
            defaultValue={user.phone}
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
        <Input
            {...register("name", {
                minLength: {
                    value: 2,
                    message: "Name must be at least 2 character",
                },
            })}
            error={errors.name?.message}
            placeholder="Name"
            defaultValue={user.name}
        />
        <div className="flex self-end gap-5">
            <Button 
                variant="dark" 
                type="submit"
                size={SizeEnum.SM}
            >
                Save changes
            </Button>
            <Button
                variant="light"
                onClick={hideForm}
                size={SizeEnum.SM}
            >
                Cancel
            </Button>
        </div>
    </form>
  )
}

export default ProfileForm