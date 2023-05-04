import { errorCatch } from "@/api/helper";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Layout from "@/components/UI/Layout/Layout";
import Loader from "@/components/UI/Loader";
import Meta from "@/components/UI/Meta";
import Title from "@/components/UI/Title";
import { useAction } from "@/hooks/useAction";
import { NextPageAuth } from "@/providers/authProvider/auth-page.types"
import { CarouselService } from "@/services/carousel/carousel.service"
import { CarouselType } from "@/services/carousel/carousel.types";
import { ICarousel } from "@/types/carousel.interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react"
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { AiOutlineMinus } from 'react-icons/ai'
import ReactSelect, { GroupBase, OptionsOrGroups, PropsValue } from "react-select";

interface IOption {
    value: string;
    label: string;
}

const AdminCarousel: NextPageAuth = () => {
    const {register, handleSubmit, formState: {errors}, control} = useForm<CarouselType>({
        mode: "onChange"
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: "items"
    })
    const {setMessage} = useAction();
    const router = useRouter();
    const {data, isLoading} = useQuery(["get carousels"], () => CarouselService.getAll(), {
        select: ({data}) => data,
    });

    const onSubmit: SubmitHandler<CarouselType> = async(data) => {
        try {
            console.log(data);
            await CarouselService.update(data);
            router.push("/");
        } catch(err) {
            setMessage(errorCatch(err));
        }
    }

    const options = useMemo(() => {
        return data?.map((i: ICarousel): IOption => {
            return {
                value: i.name,
                label: i.name
            }
        })
    }, [data]);
    
    if(isLoading) return <Loader bg="transparent"/>
    
  return (
    <Meta title="Carousel management">
        <Layout>
            <div>
                <Title>Carousel management</Title>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                    <Controller 
                        name="name"
                        control={control}
                        rules={{
                            required: "Choose carousel name"
                        }}
                        render={({field}) => (
                            <ReactSelect 
                                options={options as OptionsOrGroups<string | (ICarousel), GroupBase<string | ICarousel>> | undefined}
                                onChange={(e) => field.onChange((e as any)?.value)}
                                value={options?.find((i) => i.value === field.value) as PropsValue<string | ICarousel> | undefined}
                                placeholder="Select carousel"
                                isClearable
                                isSearchable
                            />
                        )}
                    />
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex flex-col my-5">
                            <Input
                                placeholder="Title"
                                withTitle={false}
                                {...register(`items.${index}.title` as const)}
                            />
                            <Input
                                placeholder="Image"
                                withTitle={false}
                                {...register(`items.${index}.image` as const)}
                            />
                            <Button 
                                variant="light"
                                onClick={() => remove(index)}
                                className="self-center"
                            >
                                <AiOutlineMinus />
                            </Button>
                        </div>
                    ))}
                    <div className="flex w-full justify-between mt-5">
                        <Button
                            variant="dark"
                            onClick={() => append({title: "", image: ""})}
                            type="button"
                        >
                            Add slide
                        </Button>
                        <Button
                            variant="dark"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                    {errors.root?.message && <p className="text-red-500">{errors.root?.message}</p>}
                </form>
            </div>
        </Layout>
    </Meta>
  )
}

AdminCarousel.isOnlyAdmin = true;

export default AdminCarousel