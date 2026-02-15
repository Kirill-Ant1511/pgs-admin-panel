'use client'

import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Pages } from '@/constants/page'
import { useTypeWork } from '@/store/type-work.state'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { DeleteDialog } from './DeleteDialog'

export function TypeWorkTable() {
	const { typeWorks, getAllTypeWorks, loading, deleteTypeWork } = useTypeWork()
	useEffect(() => {
		const getData = async () => {
			await getAllTypeWorks()
		}

		getData()
	}, [])

	if (loading) return <div>Загрузка...</div>
	else if (typeWorks.length === 0) return <div>Виды работ отсутствуют</div>
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Код</TableHead>
						<TableHead>Название</TableHead>
						<TableHead className='text-right'>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{typeWorks.map(typeWork => (
						<TableRow key={typeWork.id}>
							<TableCell>{typeWork.id}</TableCell>
							<TableCell>{typeWork.code}</TableCell>
							<TableCell>{typeWork.name}</TableCell>
							<TableCell className='text-right flex gap-2'>
								<Button variant='outline'>
									<Link href={Pages.EDIT_TYPE_WORK(typeWork.id)}>
										<Edit size={20} />
									</Link>
								</Button>
								<DeleteDialog typeWork={typeWork} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
