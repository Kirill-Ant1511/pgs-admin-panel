'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ModalBackground } from "@/components/ui/modal-background";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePlan } from "@/store/plan.store";
import { usePlot } from "@/store/plot.state";
import { useReport } from "@/store/report.store";
import { useSubtypeWork } from "@/store/subtype-work.state";
import { useTypeWork } from "@/store/type-work.state";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";


interface Input {
    plotId: number
    typeWorkId: number
    subtypeWorkId: number
    productionName: string
    fact: number
    date: string
    whoSend: string
    machine: string | null
    comment: string | null
}

export function CreateReportForm() {
    const router = useRouter()
    const {sendReport} = useReport()
    const {plots, getPlaningPlots} = usePlot()
    const {typeWorks, getPlaningTypeWorks} = useTypeWork()
    const {subtypeWorks, getPlaningSubtypeWorks} = useSubtypeWork()
    const {plans, selectedPlan, getPlanByFK, getAllPlans} = usePlan()
    const {
        register,
        control,
        handleSubmit,
        watch
    } = useForm<Input>({
        defaultValues: {
            productionName: ' ',
            fact: 0,
            date: new Date().toISOString().split('T')[0],
            whoSend: '',
            machine: null,
            comment: null
        }
    })
    useEffect(() => {
        const getData = async () => {
            await getPlaningPlots()
        }
        getData()
        document.body.classList.add('overflow-hidden')
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    const selectedPlotId = watch('plotId')
    const selectedTypeWorkId = watch('typeWorkId')
    const selectedSubtypeWorkId = watch('subtypeWorkId')

    useEffect(() => {
        const getTypeWorks = async () => {
            if (selectedPlotId) {
                await getPlaningTypeWorks(selectedPlotId)
            }
        }
        getTypeWorks()
    }, [selectedPlotId])

    useEffect(() => {
        const getSubtypeWorks = async () => {
            if (selectedTypeWorkId) {
                await getPlaningSubtypeWorks(selectedPlotId, selectedTypeWorkId)
            }
        }
        getSubtypeWorks()
    }, [selectedTypeWorkId])

    useEffect(() => {
        const getPlans = async () => {
            if (selectedSubtypeWorkId) {
                await getAllPlans(0, 100, selectedPlotId, selectedTypeWorkId, selectedSubtypeWorkId, null, true)
            }
        }
        getPlans()
    }, [selectedSubtypeWorkId])

    const onSubmit = async (data: Input) => {
        data.productionName = data.productionName === " " ? "" : data.productionName
        await getPlanByFK(data.plotId, data.typeWorkId, data.subtypeWorkId, data.productionName, true)
        console.log(selectedPlan)
        if (selectedPlan) {
            console.log(selectedPlan.id, data.fact, data.date, data.whoSend, data.machine, data.comment)
            await sendReport(selectedPlan.id, data.fact, data.date, data.whoSend, data.machine, data.comment)
        }
        else alert('План не найден, невозможно отправить отчет')
        closeModal()
    }

    const closeModal = () => {
        router.back()
    }
    return <ModalBackground>
        <div className='flex w-full justify-between items-center'>
            <h1>Создание отчёта</h1>
            <Button onClick={closeModal}>
                <X size={22} />
            </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Field>
                <FieldLabel>Участок</FieldLabel>
                <Controller
                    name="plotId"
                    control={control}
                    rules={{ required: 'Выберите участок' }}
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
                                <SelectItem key={plot.id} value={plot.id.toString()}>
                                    {plot.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    )}
                />
            </Field>
            <Field orientation='responsive'>
                <FieldLabel>Вид работ</FieldLabel>
                <Controller
                    name="typeWorkId"
                    control={control}
                    rules={{ required: 'Выберите вид работ' }}
                    render={({ field: { onChange, value } }) => (
                    <Select
                    disabled={!selectedPlotId}
                        onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                        value={value?.toString()} // ← Select принимает string, поэтому конвертируем
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите вид работ" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Виды работ</SelectLabel>
                            {typeWorks.map((typeWork) => (
                                <SelectItem key={typeWork.id} value={typeWork.id.toString()}>
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
                    rules={{ required: 'Выберите тип работ' }}
                    render={({ field: { onChange, value } }) => (
                    <Select
                        disabled={!selectedTypeWorkId}
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
                                <SelectItem key={subtypeWork.id} value={subtypeWork.id.toString()}>
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
                <FieldLabel>Название выработки</FieldLabel>
                <Controller
                    name="productionName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <Select
                        disabled={!selectedSubtypeWorkId}
                        value={value?.toString()} // ← Select принимает string, поэтому конвертируем
                        onValueChange={onChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите название выработки" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Названия выработок</SelectLabel>
                                <SelectItem value={" "}>Без выработки</SelectItem>
                                {plans.map((plan) => {
                                    if (!plan.productionName || plan.productionName === '') return null
                                    return (
                                        <SelectItem key={plan.id} value={plan.productionName}>
                                            {plan.productionName}
                                        </SelectItem>
                                    )
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    )}
                />
            </Field>
            <Field>
                <FieldLabel>Факт выработки(в {subtypeWorks.find(sw => sw.id === selectedSubtypeWorkId)?.unitMetering || 'ед'})</FieldLabel>
                <Input
                    type="number"
                    {...register('fact', { required: true, min: 1 })}
                />
             </Field>
            <Field>
                <FieldLabel>Дата выработки(необязательно)</FieldLabel>
                <Input
                    type="date"
                    {...register('date')}
                />
            </Field>
            <Field>
                <FieldLabel>Кто отправил</FieldLabel>
                <Input
                    type="text"
                    {...register('whoSend', { required: true })}
                />
            </Field>
            <Field>
                <FieldLabel>Машина (необязательно)</FieldLabel>
                <Input
                    type="text"
                    {...register('machine')}
                />
            </Field>
            <Field>
                <FieldLabel>Комментарий (необязательно)</FieldLabel>
                <Input
                    type="text"
                    {...register('comment')}
                />
            </Field>
            <Button type="submit">Отправить</Button>
        </form>
    </ModalBackground>
}
