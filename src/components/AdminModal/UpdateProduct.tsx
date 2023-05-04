import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product/product.service";
import { TypeProductData } from "@/services/product/product.types";
import { ICategory } from "@/types/category.interface";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Loader from "@/components/UI/Loader";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import ReactSelect, { GroupBase, OptionsOrGroups, PropsValue } from "react-select";
import styles from './AdminModal.module.scss'
import { useAction } from "@/hooks/useAction";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Line from "../UI/Line";
import Title from "../UI/Title";
import { errorCatch } from "@/api/helper";

interface UpdateProductProps {
    hideUpdateModal: () => void;
    operation: "update" | "create" | "delete";
}

interface IOption {
    value: number;
    label: string;
}

const UpdateProduct: FC<UpdateProductProps> = ({hideUpdateModal, operation}) => {
    const router = useRouter();
    const [productId, setProductId] = useState<string | null>(null);
    const {data, isLoading} = useQuery(["get categories"],
    () => CategoryService.getAll(),
    {
        select: ({data}) => data,
    })
    const {register: formReg, handleSubmit, formState: {errors}, reset, control} = useForm<TypeProductData>({
        mode: "onChange"
    });
    const {fields: imgFields, append: appendImg, remove: removeImg} = useFieldArray({
        control,
        name: "images"
    } as never);
    const {fields: charFields, append: appendChar, remove: removeChar} = useFieldArray({
        control,
        name: "characteristics"
    } as never);
    const {setMessage} = useAction();

    const options = useMemo(() => {
        return data?.map((i: ICategory): IOption => {
            return {
                value: i.id,
                label: i.name
            }
        })
    }, [data]);

    const onSubmit: SubmitHandler<TypeProductData> = async(data) => {
        try {
            if(operation === "create") {
                await ProductService.create({...data, price: +data.price});
            } else if(productId) {
                await ProductService.update(productId, {...data, price: +data.price});
            }
            reset();
            hideUpdateModal();
            router.push("/");
        } catch(err) {
            setMessage(errorCatch(err));
        }
    }

    if(isLoading) return <Loader />

  return (
    <div className={styles.curtain}>
        <div
            className="bg-white w-1/2 rounded-xl flex flex-col items-center justify-around text-xl py-5"
        >
            <h1 className="text-center font-semibold text-2xl mb-5">{`${operation[0].toUpperCase() + operation.slice(1)} product`}</h1>
            <Input 
                type="number"
                placeholder="Enter product ID"
                withTitle={false}
                onChange={(e) => setProductId(e.target.value)}
                value={productId || ""}
                className="w-full"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    {...formReg("name", {
                        required: "Name is required",
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 character",
                        },
                    })}
                    placeholder='Enter product name'
                    withTitle={false}
                    error={errors.name?.message}
                />

                <Input
                    {...formReg("description", {
                        minLength: {
                            value: 2,
                            message: "Description must be at least 2 character",
                        },
                    })}
                    placeholder='Enter product description'
                    multiple
                    withTitle={false}
                    error={errors.description?.message}
                />

                <Input
                    {...formReg("price", {
                        required: "Price is required",
                        min: {
                            value: 1,
                            message: "Price must be at least 0",
                        },
                        pattern: {
                            value: /^\d+$/,
                            message: "Price must be a number",
                        }
                    })}
                    type="number"
                    placeholder='Enter product price'
                    withTitle={false}
                    error={errors.price?.message}
                />

                <Controller
                    control={control} 
                    name="categoryId" 
                    rules={{
                        required: "Category is required",
                    }}
                    render={({field: {onChange, value}, fieldState: {error}}) => {
                        return (
                            <>
                                <ReactSelect
                                    options={options as OptionsOrGroups<string | ICategory, GroupBase<string | ICategory>> | undefined}
                                    value={options?.find(i => i.value === value) as PropsValue<string | ICategory> | undefined}
                                    onChange={(newValue) => onChange((newValue as any)?.value)}
                                    placeholder="Select category"
                                    className="w-1/2"
                                    isClearable
                                />
                                {error && <p className="text-warning text-sm self-start">{error?.message}</p>}
                            </>
                        )
                    }}
                />

                <Line />

                <div className="flex mt-3 flex-col">
                    <Title className="text-base mb-2">Characteristics</Title>
                        {charFields.map((item, idx) =>
                            <div key={item.id} className="flex justify-between relative">
                                <Input 
                                    {...formReg(`characteristics.${idx}.name`, {
                                        required: "Name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 character",
                                        },
                                    })}
                                    placeholder='Enter property name'
                                    withTitle={false}
                                    error={errors.characteristics?.message}
                                />
                                <Input 
                                    {...formReg(`characteristics.${idx}.value`, {
                                        required: "Value is required",
                                    })}
                                    placeholder='Enter property value'
                                    withTitle={false}
                                    error={errors.characteristics?.message}
                                />
                                <Button
                                    variant="light"
                                    onClick={() => removeChar(idx)}
                                    className="h-1/2 self-center"
                                >
                                    <AiOutlineMinus />
                                </Button>
                            </div>
                        )}
                    <Button 
                        className="self-end mt-5"
                        variant="dark"
                        onClick={() => appendChar({name: "", value: ""})}
                        disabled={charFields.length >= 5}
                    >
                        <AiOutlinePlus />
                    </Button>
                </div>
                
                <Line />

                <div className="mt-3 flex flex-col">
                    <Title className="text-base mb-2">Images</Title>
                    {imgFields.map((item, idx) =>
                        <div key={item.id} className="flex justify-between">
                            <Input 
                                {...formReg(`images.${idx}`)}
                                placeholder='Enter product image link'
                                className="w-3/4"
                                withTitle={false}
                                error={errors.images?.message}
                            />
                            <Button
                                variant="light"
                                className="self-center"
                                onClick={() => removeImg(idx)}
                            >
                                <AiOutlineMinus />
                            </Button>
                        </div>
                    )}
                    <Button 
                        variant="dark" 
                        className="self-end mt-5"
                        onClick={() => appendImg("")}
                        disabled={imgFields.length >=7}
                    >
                        <AiOutlinePlus />
                    </Button>
                </div>

                <div className="w-full flex justify-evenly mt-10">
                    <Button variant="dark" type="submit">
                        {operation[0].toUpperCase() + operation.slice(1)}
                    </Button>
                    <Button variant="light" onClick={hideUpdateModal}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
                
    </div>
  )
}

export default UpdateProduct