"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ModalBackground } from "@/components/ui/modal-background";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants/pagination";
import { useSubtypeWork } from "@/store/subtype-work.state";
import { useTypeWork } from "@/store/type-work.state";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface Props {
    id: number;
}

interface Input {
    code: string;
    name: string;
    unitMetering: string;
    typeWorkId: number;
}

export function EditSubtypeWorkForm({ id }: Props) {
    const router = useRouter();
    const { typeWorks, getAllTypeWorks } = useTypeWork();
    const {
        selectedSubtypeWork,
        getSubtypeWorkById,
        updateSubtypeWork,
        getAllSubtypeWorks,
    } = useSubtypeWork();
    const { register, control, handleSubmit, setValue } = useForm<Input>({
        defaultValues: {
            code: "",
            name: "",
            unitMetering: "",
            typeWorkId: 0,
        },
    });
    useEffect(() => {
        const getData = async () => {
            await getSubtypeWorkById(id);
            await getAllTypeWorks();
        };
        getData();
    }, [id]);

    useEffect(() => {
        if (selectedSubtypeWork) {
            setValue("code", selectedSubtypeWork.code);
            setValue("name", selectedSubtypeWork.name);
            setValue("unitMetering", selectedSubtypeWork.unitMetering);
            setValue("typeWorkId", selectedSubtypeWork.typeWorkId);
        }
    }, [selectedSubtypeWork, setValue]);

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
    }, []);

    const onSubmit = async (data: Input) => {
        console.log(data);
        await updateSubtypeWork(
            id,
            data.code,
            data.name,
            data.unitMetering,
            data.typeWorkId,
        );
        await getAllSubtypeWorks(DEFAULT_PAGE, DEFAULT_PAGE_SIZE);
        closeWindow();
    };

    const closeWindow = () => {
        document.body.classList.remove("overflow-hidden");
        router.back();
    };

    return (
        <ModalBackground>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Изменение типа работ</h1>
                <Button onClick={closeWindow}>
                    <X size={20} />
                </Button>
            </div>
            {selectedSubtypeWork ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <Field>
                        <FieldLabel htmlFor="code">Код типа работы</FieldLabel>
                        <Input
                            id="code"
                            type="text"
                            {...register("code", { required: true })}
                            defaultValue={selectedSubtypeWork.code}
                            placeholder="Код типа работы"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="name">
                            Название типа работы
                        </FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            {...register("name", { required: true })}
                            defaultValue={selectedSubtypeWork.name}
                            placeholder="Название типа работы"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="name">
                            Единица измерения
                        </FieldLabel>
                        <Input
                            id="unitMetering"
                            type="text"
                            {...register("unitMetering", { required: true })}
                            defaultValue={selectedSubtypeWork.unitMetering}
                            placeholder="Единица измерения"
                        />
                    </Field>
                    <Field>
                        <FieldLabel>Вид работ</FieldLabel>
                        <Controller
                            name="typeWorkId"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    onValueChange={(val) =>
                                        onChange(val ? Number(val) : null)
                                    }
                                    value={
                                        value != null ? value.toString() : ""
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите вид работ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup
                                            defaultValue={
                                                selectedSubtypeWork.typeWorkId
                                            }
                                        >
                                            <SelectLabel>
                                                Виды работ
                                            </SelectLabel>
                                            {typeWorks.map((typeWork) => (
                                                <SelectItem
                                                    key={typeWork.id}
                                                    value={typeWork.id.toString()}
                                                >
                                                    {typeWork.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>
                    <Button type="submit" variant="default">
                        Сохранить
                    </Button>
                </form>
            ) : (
                <p>Такого типа работ не существует</p>
            )}
        </ModalBackground>
    );
}
