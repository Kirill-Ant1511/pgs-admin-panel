'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePlan } from "@/store/plan.store";
import { useEffect, useState } from "react";


export function PlanTable() {
    const {plans, getAllPlans} = usePlan()
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(10)
    useEffect(() => {
        const getData = async () => {
            await getAllPlans(page, size)
        }
        getData()
    }, [])
    return <>
			<div className='p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl space-y-3 mb-5'>
				<h1>Фильтры</h1>
				{/* <Input
					type='text'
					placeholder='Название...'
					value={nameSubstring}
					onChange={e => setNameSubstring(e.target.value)}
					className='bg-accent'
				/> */}
				<div className='space-x-2'>
					<Button>Поиск</Button>
					<Button
						variant='secondary'
					>
						Сбросить фильтры
					</Button>
				</div>
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
                                <TableCell></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
				
			</Table>}
		</>
}
