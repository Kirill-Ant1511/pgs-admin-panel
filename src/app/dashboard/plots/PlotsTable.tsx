'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Pages } from '@/constants/page'
import { usePlot } from '@/store/plot.state'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DeleteDialog } from './DeleteDialog'
export function PlotsTable() {
	const { plots, getPlots, loading } = usePlot()
	const [nameSubstring, setNameSubstring] = useState<string>('')
	useEffect(() => {
		const getData = async () => {
			await getPlots(nameSubstring)
		}
		getData()
	}, [])
	if (loading) return <div>Loading...</div>

	const getPlotByFilter = async () => {
		await getPlots(nameSubstring)
	}

	const resetFilters = async () => {
		setNameSubstring('')
		await getPlots()
	}

	if (loading) return <div>Загрузка...</div>
	else if (plots.length === 0) return <div>Участки отсутствуют</div>
	return (
		<>
			<div className='p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl space-y-3 mb-5'>
				<h1>Фильтры</h1>
				<Input
					type='text'
					placeholder='Название...'
					value={nameSubstring}
					onChange={e => setNameSubstring(e.target.value)}
					className='bg-accent'
				/>
				<div className='space-x-2'>
					<Button onClick={getPlotByFilter}>Поиск</Button>
					<Button
						onClick={resetFilters}
						variant='secondary'
					>
						Сбросить фильтры
					</Button>
				</div>
			</div>
			<Table className='w-full'>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>ID</TableHead>
						<TableHead className='text-center'>Название</TableHead>
						<TableHead className='text-center'>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.isArray(plots) &&
						plots.map(plot => (
							<TableRow key={plot.id}>
								<TableCell className='text-center'>{plot.id}</TableCell>
								<TableCell className='text-center'>{plot.name}</TableCell>
								<TableCell className='flex gap-2 justify-center'>
									<Button variant='outline'>
										<Link
											href={Pages.EDIT_PLOT(plot.id)}
											scroll={false}
										>
											<Edit size={20} />
										</Link>
									</Button>
									<DeleteDialog plot={plot} />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</>
	)
}
