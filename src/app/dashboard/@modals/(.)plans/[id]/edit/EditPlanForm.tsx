'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ModalBackground } from "@/components/ui/modal-background"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants/pagination"
import { usePlan } from "@/store/plan.store"
import { usePlot } from "@/store/plot.state"
import { useSubtypeWork } from "@/store/subtype-work.state"
import { useTypeWork } from "@/store/type-work.state"
import { get } from "http"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"

interface Props {
    id: number
}

interface Input {
    plotId: number,
    typeWorkId: number,
    subtypeWorkId: number,
    volume: number,
    productionName?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    isActive: boolean
}

export function EditPlanForm({id}: Props) {
    const router = useRouter()
    const {selectedPlan, getPlanById, updatePlan, getAllPlans} = usePlan()
    const {plots, getPlots} = usePlot()
    const {typeWorks, getAllTypeWorks} = useTypeWork()
    const {selectedSubtypeWork, subtypeWorks, getSubtypeWorkByTypeWorkId, getSubtypeWorkById} = useSubtypeWork()
    const {
        register, 
        handleSubmit, 
        setValue,
        control,
        watch,
    } = useForm<Input>({
        defaultValues: {
            plotId: undefined as unknown as number,
            typeWorkId: undefined as unknown as number,
            subtypeWorkId: undefined as unknown as number,
            volume: undefined as unknown as number,
            productionName: null,
            startDate: null,
            endDate: null,
            isActive: false
        }
    })

    const selectTypeWorkId = watch('typeWorkId')

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        const getData = async () => {
            await getPlanById(id)
            if (plots.length === 0 && typeWorks.length === 0) {
                await getPlots()
                await getAllTypeWorks()
            }
        }
        getData()
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [id])

    useEffect(() => {
        if (selectedPlan) {
            setValue('plotId', selectedPlan.plot.id)
            setValue('typeWorkId', selectedPlan.typeWork.id)
            setValue('subtypeWorkId', selectedPlan.subtypeWork.id)
            setValue('volume', selectedPlan.volume)
            setValue('productionName', selectedPlan.productionName)
            setValue('startDate', selectedPlan.startDate ? (selectedPlan.startDate.toString().split('T')[0]) : null)
            setValue('endDate', selectedPlan.endDate ? (selectedPlan.endDate.toString().split('T')[0]) : null)
            setValue('isActive', selectedPlan.isActive)
        }   
    }, [selectedPlan, setValue])

    useEffect(() => {
        const getSubtypeWorks = async () => {
            if (selectTypeWorkId) {
                await getSubtypeWorkByTypeWorkId(selectTypeWorkId)
                await getSubtypeWorkById(selectTypeWorkId)
            }
        }
        getSubtypeWorks()
    }, [selectTypeWorkId])


    const onSubmit = async (data: Input) => {
        await updatePlan(id, data.plotId, data.typeWorkId, data.subtypeWorkId, data.volume, data.isActive, data.productionName, data.startDate ? new Date(data.startDate) : null, data.endDate ? new Date(data.endDate) : null)
        await getAllPlans(DEFAULT_PAGE, DEFAULT_PAGE_SIZE)
        closeWindow()
    }

    const closeWindow = () => {
        router.back()
    }


    return <ModalBackground>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-bold'>Изменение плана работ</h1>
            <Button onClick={closeWindow}>
                <X size={20} />
            </Button>
        </div>
        {selectedPlan ? <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Field>
            <FieldLabel>Участок</FieldLabel>
            <Controller
                name="plotId"
                control={control}
                rules={{ required: 'Выберите участок' }}
                render={({ field: { onChange, value } }) => (
                <Select
                    onValueChange={(val) => onChange(Number(val))}
                    value={value?.toString()} 
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите участок" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup defaultValue={selectedPlan.plot.id.toString()}>
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
                    onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                    value={value?.toString()} // ← Select принимает string, поэтому конвертируем
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите вид работ" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup defaultValue={selectedPlan.typeWork.id.toString()}>
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
                        onValueChange={(val) => onChange(Number(val))} // ← преобразуем строку в число
                        value={value?.toString()} // ← Select принимает string, поэтому конвертируем
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите тип работ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup defaultValue={selectedSubtypeWork?.id.toString()}>
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
                <FieldLabel htmlFor="productionName">Название выработки(Необязательно)</FieldLabel>
                <Input
                    id="productionName"
                    type="text"
                    {...register('productionName', {required: false})}
                    defaultValue={selectedPlan.productionName}
                    placeholder="Название выработки"
                />
            </Field>
            <Field>
                <FieldLabel htmlFor="volume">Объём работ</FieldLabel>
                <Input 
                    id="volume"
                    type="number"
                    step='0.01'
                    {...register('volume', {required: true})}
                    placeholder="Объём работ"
                    defaultValue={selectedPlan.volume}
                />
            </Field>
            <div className="flex gap-2">
                <Field>
                    <FieldLabel htmlFor="startDate">Начальная дата(Необязательно)</FieldLabel>
                    <Input 
                        id="startDate"
                        type="date"
                        {...register('startDate', {required: false})}
                        defaultValue={selectedPlan.startDate ? new Date(selectedPlan.startDate).toISOString().split('T')[0] : undefined}
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor="endDate">Конечная дата(Необязательно)</FieldLabel>
                    <Input 
                        id="endDate"
                        type="date"
                        {...register('endDate', {required: false})}
                        defaultValue={selectedPlan.endDate ? new Date(selectedPlan.endDate).toISOString().split('T')[0] : undefined}
                    />
                </Field>
            </div>
            <Field>
                <FieldLabel htmlFor="isActive">Активный</FieldLabel>
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            onValueChange={(val) => onChange(val === 'true')}
                            value={value ? 'true' : 'false'}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup defaultValue={selectedPlan.isActive ? 'true' : 'false'}>
                                    <SelectLabel>Статус</SelectLabel>
                                    <SelectItem value="true">Активный</SelectItem>
                                    <SelectItem value="false">Неактивный</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
            </Field>
            

            <Button type="submit" className="mt-4">
                Сохранить
            </Button>
        </form> : <div>Такого плана не существует</div>}
    </ModalBackground>
}
