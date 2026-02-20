'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { usePlot } from '@/store/plot.state'
import { useReport } from '@/store/report.store'
import { useSubtypeWork } from '@/store/subtype-work.state'
import { useTypeWork } from '@/store/type-work.state'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'


interface FilterInputs {
	plotId: number | null
	typeWorkId: number | null
	subtypeWorkId: number | null
	productionName: string | null
	startDate: string | null
	endDate: string | null
	page: number
	size: number
}

export default function ReportTable() {
    const {reports, getAllReports} = useReport()
	const {plots, getPlots} = usePlot()
	const {typeWorks, getAllTypeWorks} = useTypeWork()
	const {subtypeWorks, getSubtypeWorkByTypeWorkId} = useSubtypeWork()

	const {
		register,
		control,
		handleSubmit,
		reset,
		watch
	} = useForm<FilterInputs>({
		defaultValues: {
			plotId: null,
			typeWorkId: null,
			subtypeWorkId: null,
			productionName: null,
			startDate: null,
			endDate: null,
			page: DEFAULT_PAGE,
			size: DEFAULT_PAGE_SIZE
		}
	})

	const selectedTypeWork = watch('typeWorkId')
    useEffect(() => {
        const getData = async () => {
            await getAllReports(DEFAULT_PAGE, DEFAULT_PAGE_SIZE)
            await getPlots()
            await getAllTypeWorks()
        }
        getData()
    }, [])

	useEffect(() => {
		const getSubtypeWorks = async () => {
			if (selectedTypeWork) {
				await getSubtypeWorkByTypeWorkId(selectedTypeWork)
			}
		}
		getSubtypeWorks()
	}, [selectedTypeWork])


	const onSubmit = async (data: FilterInputs) => {
		await getAllReports(data.page, data.size, data.plotId, data.typeWorkId, data.subtypeWorkId, data.productionName, data.startDate, data.endDate)
		console.log(data)
	}
    return <>
			<div className='p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl space-y-3 mb-5'>
				<h1>Фильтры</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
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
					<div className="flex gap-2">
						<Field>
							<FieldLabel>Дата начала</FieldLabel>
							<Input
								type='date'
								placeholder="Дата начала"
								{...register('startDate')}
							/>
						</Field>
						<Field>
							<FieldLabel>Дата окончания</FieldLabel>
							<Input
								type='date'
								placeholder="Дата окончания"
								{...register('endDate')}
							/>
						</Field>
					</div>
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
							variant='secondary'
							onClick={() => {
								getAllReports(DEFAULT_PAGE, DEFAULT_PAGE_SIZE)
								reset()
							}}
							type='button'
						>
							Сбросить фильтры
						</Button>
					</div>
				</form>
				
			</div>
            { reports.length === 0 
            ? <div className='w-full h-40 flex items-center justify-center text-muted-foreground'>Нет данных для отображения</div> 
            : <Table className='w-full'>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Участок</TableHead>
						<TableHead>Вид работ</TableHead>
                        <TableHead>Тип работ</TableHead>
                        <TableHead>Название выработки</TableHead>
                        <TableHead>Требуемый объём</TableHead>
                        <TableHead>Факт</TableHead>
                        <TableHead>Дельта</TableHead>
                        <TableHead>Дата отправки</TableHead>
                        <TableHead>Кто отправил</TableHead>
                        <TableHead>Комментарий</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
                    {
						reports.map(report => (
							<TableRow key={report.id}>
								<TableCell>{report.id}</TableCell>
								<TableCell>{report.plan.plot.name}</TableCell>
								<TableCell>{report.plan.typeWork.name}</TableCell>
								<TableCell>{report.plan.subtypeWork.name}</TableCell>
								<TableCell>{report.plan.productionName}</TableCell>
								<TableCell>{report.plan.volume}</TableCell>
								<TableCell>{report.fact}</TableCell>
								<TableCell>{report.delta}</TableCell>
								<TableCell>{report.date}</TableCell>
								<TableCell>{report.whoSend}</TableCell>
								<TableCell>{report.comment}</TableCell>
							</TableRow>
						))
					}
					
				</TableBody>
			</Table>
            }
		</>
}
