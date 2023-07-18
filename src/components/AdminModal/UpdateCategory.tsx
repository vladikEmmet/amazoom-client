import Button from '@/components/UI/Button/Button'
import Input from '@/components/UI/Input/Input'
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface UpdateCategoryProps {
    onSubmit: SubmitHandler<{name: string}>;
    hideModal: () => void;
}

const UpdateCategory: FC<UpdateCategoryProps> = ({onSubmit, hideModal}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<{name: string}>({
        mode: "onChange"
    });

    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
            {...register("name", {
                required: "Name is required",
                minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                },
                maxLength: {
                    value: 20,
                    message: "Too large name(20+ characters)"
                }
            })}
            placeholder='Enter category name'
            withTitle={false}
            error={errors?.name?.message}
        />
        <div className="w-full flex justify-evenly mt-10">
            <Button
                variant="dark"
                type="submit"
            >   
                Update
            </Button>
            <Button 
                variant="light" 
                onClick={hideModal}
            >
                Cancel
            </Button>
        </div>
    </form>
  )
}

export default UpdateCategory