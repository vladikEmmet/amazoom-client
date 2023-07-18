import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product/product.service";
import Input from "@/components/UI/Input/Input";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../UI/Button/Button";
import styles from './AdminModal.module.scss'
import UpdateCategory from "./UpdateCategory";
import { useAction } from "@/hooks/useAction";
import { errorCatch } from "@/api/helper";
import Modal from "../UI/Modal/Modal";
import { AdminOpearionsEnum, AdminTypesEnum } from "@/types/AdminOperations";

interface AdminModalProps {
    type: AdminTypesEnum;
    operation: AdminOpearionsEnum;
    hideModal: () => void;
}

const AdminModal: FC<AdminModalProps> = ({type, operation, hideModal}) => {
    const {register: formReg, handleSubmit, formState: {errors}, reset} = useForm<{value: string}>({
        mode: "onChange"
    });
    const router = useRouter();
    const [changedId, setChangedId] = useState<number | null>(null);
    const {setMessage} = useAction();
    
    const handleConfirm: SubmitHandler<{value:string}> = async (data) => {
        try {
            const op = type === AdminTypesEnum.PRODUCT ? ProductService : CategoryService;
            if (operation === AdminOpearionsEnum.DELETE) {
                await op.delete(+data.value);
                reset();
                router.push("/");
            } else if (operation === AdminOpearionsEnum.UPDATE && type !== AdminTypesEnum.PRODUCT) {
                const prev = await (op as typeof CategoryService).getById(+data.value);
                setChangedId(+data.value);
            } else {
                await op.create({name: data.value} as any);
                router.push("/");
            }
        } catch(err) {
            setMessage(errorCatch(err));
        } finally {
            hideModal();
        }
    }

    const updateCategory: SubmitHandler<{name: string}> = async(data) => {
        try {
            await CategoryService.update(changedId as number, data.name);
            setChangedId(null);
            hideModal();
            router.push("/");
        } catch(err) {
            setMessage(errorCatch(err));
        }
    }
    
  return (

    <Modal 
        title={(operation === AdminOpearionsEnum.DELETE ? "Delete " : 
            operation === AdminOpearionsEnum.CREATE ? "New " : "Edit ") + type}
    >

            {changedId === null ? (
            
            <form onSubmit={handleSubmit(handleConfirm)}>
                {
                    (operation === AdminOpearionsEnum.DELETE || operation === AdminOpearionsEnum.UPDATE) ?
                    (<Input 
                        {...formReg("value", {
                            required: "Id is required",
                            minLength: {
                                value: 1,
                                message: "Id must be at least 1 character",
                            },
                            pattern: {
                                value: /^\d+$/,
                                message: "Id must be a number",
                            },
                        })}
                        placeholder={`Enter ${type} id`}
                        withTitle={false}
                        error={errors.value?.message}
                        type="number"
                        min={0}
                    />
                    ) : (
                        <Input 
                            {...formReg("value", {
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
                            placeholder={`Enter category name`}
                            withTitle={false}
                            error={errors.value?.message}
                        />
                    )
                }
                <div className="w-full flex justify-evenly mt-5">
                    <Button 
                        variant="dark"
                        type="submit"
                    >
                        {operation === AdminOpearionsEnum.DELETE ? "Yes" : 
                            operation === AdminOpearionsEnum.UPDATE ? "Continue" : 
                            "Create"}
                    </Button>
                    <Button 
                        variant="light" 
                        onClick={hideModal}
                    >
                        {operation === AdminOpearionsEnum.DELETE ? "No" : "Cancel"}
                    </Button>
                </div>
            </form>
        ) : (
            <UpdateCategory 
                onSubmit={updateCategory}
                hideModal={hideModal}
            />
        )}
    </Modal>
  )
}

export default AdminModal