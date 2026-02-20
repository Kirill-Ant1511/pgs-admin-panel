'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePlan } from "@/store/plan.store";
import { usePlot } from "@/store/plot.state";
import { useSubtypeWork } from "@/store/subtype-work.state";
import { useTypeWork } from "@/store/type-work.state";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DeleteDialog } from "./DeleteDialog";


interface FilterInput {
    plotId: number | null
    typeWorkId: number | null
    subtypeWorkId: number | null
    productionName: string | null
    isActive: boolean | null
    page: number
    size: number
}

const BASE_PAGE = 0
const BASE_SIZE = 10

export function PlanTable() {
    const {plans, getAllPlans} = usePlan()
    const {plots, getPlots} = usePlot()
    const {typeWorks, getAllTypeWorks} = useTypeWork()
    const {subtypeWorks, getSubtypeWorkByTypeWorkId} = useSubtypeWork()

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors }
    } = useForm<FilterInput>(
        {defaultValues: {
                plotId: null,
                typeWorkId: null,
                subtypeWorkId: null,
                productionName: null,
                isActive: null,
                page: BASE_PAGE,
                size: BASE_SIZE,
            }
        }
    )

    const selectedTypeWork = watch('typeWorkId')


    useEffect(() => {
        const getData = async () => {
            await getAllPlans(BASE_PAGE, BASE_SIZE)
            await getPlots()
            await getAllTypeWorks()
        }
        getData()
    }, [])

    useEffect(() => {
        const getSubtypeWork = async () => {
            if (selectedTypeWork) {
                await getSubtypeWorkByTypeWorkId(selectedTypeWork)
            }
        }
        getSubtypeWork()
    }, [selectedTypeWork])

    const onSubmit = async (data: FilterInput) => {
        console.log(data)
        await getAllPlans(data.page, data.size, data.plotId, data.typeWorkId, data.subtypeWorkId, data.productionName, data.isActive)
    }

    return <>
			<div className='p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl  mb-5'>
                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Фильтры</h1>
                    
                    {/* <Input
                        type='text'
                        placeholder='Название...'
                        value={nameSubstring}
                        onChange={e => setNameSubstring(e.target.value)}
                        className='bg-accent'
                    /> */}
                    <Field>
                        <FieldLabel>Участок</FieldLabel>
                        <Controller
                            name="plotId"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={(val) => onChange(val ? Number(val) : null)}
                                value={value != null ? value.toString() : ""}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите участок" />
                                </SelectTrigger>
                                <SelectContent >
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
                    <div className="flex gap-2">
                        <Field>
                            <FieldLabel>Вид работ</FieldLabel>
                            <Controller
                                name="typeWorkId"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                <Select
                                    onValueChange={(val) => onChange(val ? Number(val) : null)}
                                    value={value != null ? value.toString() : ""}
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
                                render={({ field: { onChange, value } }) => (
                                <Select
                                    disabled={!selectedTypeWork}
                                    onValueChange={(val) => onChange(val ? Number(val) : null)}
                                    value={value != null ? value.toString() : ""}
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
                    </div>
                    <Field>
                        <FieldLabel>Название выработки</FieldLabel>
                        <Input
                            placeholder="Название выработки"
                            {...register('productionName')}
                        />
                    </Field>
                    <Field>
                        <FieldLabel>Статус</FieldLabel>
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    onValueChange={(val) => onChange(val === '' ? null : val === 'true')}
                                    value={value != null ? value.toString() : ""}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите статус" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Статус</SelectLabel>
                                            <SelectItem value="true">Активный</SelectItem>
                                            <SelectItem value="false">Неактивный</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>
                    <div className="flex gap-2">
                        <Field>
                            <FieldLabel>Страница</FieldLabel>
                            <Input
                                type="number"
                                min={0}
                                {...register('page', { valueAsNumber: true })}
                                placeholder="Страница"
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Страница</FieldLabel>
                            <Input
                                type="number"
                                min={1}
                                {...register('size', { valueAsNumber: true })}
                                placeholder="Размер страницы"
                            />
                        </Field>
                    </div>
                    <div className='space-x-2'>
                        <Button type='submit'>Поиск</Button>
                        <Button
                            onClick={() => {
                                getAllPlans(BASE_PAGE, BASE_SIZE)
                                reset()
                            }}
                            variant='secondary'
                            type="button"
                        >
                            Сбросить фильтры
                        </Button>
                    </div>
                </form>
			</div>
            { plans.length === 0 ? (
				<div>
					Нет данных
				</div>
			) :
			<Table className='w-full'>
				<TableHeader>
					<TableRow>
						<TableHead >ID</TableHead>
						<TableHead>Участок</TableHead>
						<TableHead>Вид работ</TableHead>
                        <TableHead>Тип работ</TableHead>
                        <TableHead>Название выработки</TableHead>
                        <TableHead>Объём</TableHead>
                        <TableHead>Дата начала работ</TableHead>
                        <TableHead>Дата конца работ</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
					</TableRow>
                    
				</TableHeader>
                <TableBody>
                    {
                        plans.map(plan => (
                            <TableRow key={plan.id}> 
                                <TableCell>{plan.id}</TableCell>
                                <TableCell>{plan.plot.name}</TableCell>
                                <TableCell>{plan.typeWork.name}</TableCell>
                                <TableCell>{plan.subtypeWork.name}</TableCell>
                                <TableCell>{plan.productionName}</TableCell>
                                <TableCell>{plan.volume}</TableCell>
                                <TableCell>{plan.startDate}</TableCell>
                                <TableCell>{plan.endDate}</TableCell>
                                <TableCell>{plan.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell className="flex justify-end">
                                    <DeleteDialog plan={plan} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
				
			</Table>}
		</>
}
