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
import { usePlan } from "@/store/plan.store";
import { usePlot } from "@/store/plot.state";
import { useSubtypeWork } from "@/store/subtype-work.state";
import { useTypeWork } from "@/store/type-work.state";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

interface Input {
    plotId: number;
    typeWorkId: number;
    subtypeWorkId: number;
    productionName: string | null;
    volume: number;
    startDate: Date | null;
    endDate: Date | null;
}

export function CreatePlanForm() {
    const router = useRouter();
    const { plots, getPlots } = usePlot();
    const { typeWorks, getAllTypeWorks } = useTypeWork();
    const { subtypeWorks, getSubtypeWorkByTypeWorkId } = useSubtypeWork();
    const { getAllPlans, createPlan } = usePlan();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<Input>({
        defaultValues: {
            plotId: undefined as unknown as number,
            typeWorkId: undefined as unknown as number,
            subtypeWorkId: undefined as unknown as number,
            productionName: null,
            volume: undefined as unknown as number,
            startDate: null,
            endDate: null,
        },
    });

    const closeModal = () => {
        router.back();
    };
    const selectTypeWorkId = watch("typeWorkId");

    useEffect(() => {
        getPlots();
        getAllTypeWorks();
    }, []);

    useEffect(() => {
        const getSubtypeWork = async () => {
            await getSubtypeWorkByTypeWorkId(selectTypeWorkId);
        };
        getSubtypeWork();
    }, [selectTypeWorkId]);

    const onSubmit = async (data: Input) => {
        if (data.productionName === "") data.productionName = null;
        data.volume = Number(data.volume);
        await createPlan(
            data.plotId,
            data.typeWorkId,
            data.subtypeWorkId,
            data.volume,
            data.productionName,
            data.startDate,
            data.endDate,
        );
        await getAllPlans(DEFAULT_PAGE, DEFAULT_PAGE_SIZE);
        closeModal();
    };

    return (
        <ModalBackground>
            <div className="flex w-full justify-between items-center">
                <h1>Создание плана</h1>
                <Button onClick={closeModal}>
                    <X size={22} />
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Field>
                    <FieldLabel>Участок</FieldLabel>
                    <Controller
                        name="plotId"
                        control={control}
                        rules={{ required: "Выберите участок" }}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                                value={value?.toString()} // ← Select принимает string, поэтому конвертируем
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите участок" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Участки</SelectLabel>
                                        {plots.map((plot) => (
                                            <SelectItem
                                                key={plot.id}
                                                value={plot.id.toString()}
                                            >
                                                {plot.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </Field>
                <Field orientation="responsive">
                    <FieldLabel>Вид работ</FieldLabel>
                    <Controller
                        name="typeWorkId"
                        control={control}
                        rules={{ required: "Выберите вид работ" }}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                                value={value?.toString()} // ← Select принимает string, поэтому конвертируем
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите вид работ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Участки</SelectLabel>
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
                <Field>
                    <FieldLabel>Тип работ</FieldLabel>
                    <Controller
                        name="subtypeWorkId"
                        control={control}
                        rules={{ required: "Выберите тип работ" }}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                disabled={!selectTypeWorkId}
                                onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                                value={value?.toString()} // ← Select принимает string, поэтому конвертируем
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите тип работ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Типы работ</SelectLabel>
                                        {subtypeWorks.map((subtypeWork) => (
                                            <SelectItem
                                                key={subtypeWork.id}
                                                value={subtypeWork.id.toString()}
                                            >
                                                {subtypeWork.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="productionName">
                        Название выработки(Необязательно)
                    </FieldLabel>
                    <Input
                        id="productionName"
                        type="text"
                        {...register("productionName", { required: false })}
                        placeholder="Название выработки"
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="volume">Объём работ</FieldLabel>
                    <Input
                        id="volume"
                        type="number"
                        step="0.01"
                        {...register("volume", { required: true })}
                        placeholder="Объём работ"
                    />
                </Field>
                <div className="flex gap-2">
                    <Field>
                        <FieldLabel htmlFor="startDate">
                            Начальная дата(Необязательно)
                        </FieldLabel>
                        <Input
                            id="startDate"
                            type="date"
                            {...register("startDate", { required: false })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="endDate">
                            Конечная дата(Необязательно)
                        </FieldLabel>
                        <Input
                            id="endDate"
                            type="date"
                            {...register("endDate", { required: false })}
                        />
                    </Field>
                </div>
                {errors.plotId && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.plotId.message}
                    </p>
                )}

                <Button type="submit" className="mt-4">
                    Создать
                </Button>
            </form>
        </ModalBackground>
    );
}
