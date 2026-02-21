'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants/pagination"
import { useSubtypeWork } from "@/store/subtype-work.state"
import { useTypeWork } from "@/store/type-work.state"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { DeleteDialog } from "./DeleteDialog"
import { Edit } from "lucide-react"
import Link from "next/link"
import { Pages } from "@/constants/page"


interface FilterInputs {
    code: string | null
    name: string | null
    typeWorkId: number | null
    page: number
    size: number
}

export function SubtypeWorkTable() {
    const { subtypeWorks, getAllSubtypeWorks} = useSubtypeWork()
    const {typeWorks, getAllTypeWorks} = useTypeWork()
    const {
        register,
        control,
        reset,
        handleSubmit,
    } = useForm<FilterInputs>({
        defaultValues: {
            code: null,
            name: null,
            typeWorkId: null,
            page: DEFAULT_PAGE,
            size: DEFAULT_PAGE_SIZE
        }
    })
    useEffect(() => {
        const getData = async () => {
            await getAllSubtypeWorks(DEFAULT_PAGE, DEFAULT_PAGE_SIZE)
            await getAllTypeWorks()
        }
        getData()
    }, [])


    const onSubmit = async (data: FilterInputs) => {
        await getAllSubtypeWorks(data.page, data.size, data.name, data.code?.toUpperCase(), data.typeWorkId)
    }
    return <>
			<div className='p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl space-y-3 mb-5'>
				<h1>Фильтры</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <Field>
                        <FieldLabel>Код</FieldLabel>
                        <Input
                            type='text'
                            placeholder='Код. .'
                            {...register('code')}
                            className='bg-accent'
                        />
                    </Field>
                    <Field>
                        <FieldLabel>Название</FieldLabel>
                        <Input
                            type='text'
                            placeholder='Название...'
                            {...register('name')}
                            className='bg-accent'
                        />
                    </Field>
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
                        <Button type="submit">Поиск</Button>
                        <Button
                            variant='secondary'
                            onClick={() => {
                                getAllSubtypeWorks(DEFAULT_PAGE, DEFAULT_PAGE_SIZE)
                                reset()
                            }}
                            type="button"
                        >
                            Сбросить фильтры
                        </Button>
                    </div>
                </form>
			</div>
			{ subtypeWorks.length === 0 
			? <div className='w-full h-40 flex items-center justify-center text-muted-foreground'>Нет данных для отображения</div> 
			: <Table className='w-full'>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>ID</TableHead>
                        <TableHead className='text-center'>Код</TableHead>
						<TableHead className='text-center'>Название</TableHead>
                        <TableHead className='text-center'>Вид работ</TableHead>
						<TableHead className='text-center'>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					
						{subtypeWorks.map(subtypeWork => (
							<TableRow key={subtypeWork.id}>
								<TableCell className='text-center'>{subtypeWork.id}</TableCell>
								<TableCell className='text-center'>{subtypeWork.code}</TableCell>
								<TableCell className='text-center'>{subtypeWork.name}</TableCell>
                                <TableCell className='text-center'>{subtypeWork.typeWorkId}</TableCell>
								<TableCell className='flex gap-2 justify-center'>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                    >
                                        <Link href={Pages.EDIT_SUBTYPE_WORK(subtypeWork.id)}>
                                            <Edit size={20} />
                                        </Link>
                                    </Button>
									<DeleteDialog subtypeWork={subtypeWork} />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			}
		</>
}
