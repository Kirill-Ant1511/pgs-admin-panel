'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePlot } from '@/store/plot.state'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	id: number
}

interface Input {
	name: string
}

export function EditForm({ id }: Props) {
	const router = useRouter()
	const { selectedPlot, getPlotById, loading, editPlot, getPlots } = usePlot()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<Input>({
		defaultValues: {
			name: ''
		}
	})
	const closeWindow = () => {
		document.body.classList.remove('overflow-hidden')
		router.back()
	}

	useEffect(() => {
		document.body.classList.add('overflow-hidden')
	}, [])

	useEffect(() => {
		const getData = async () => {
			await getPlotById(id)
		}

		getData()
	}, [id])

	useEffect(() => {
		if (selectedPlot) {
			setValue('name', selectedPlot.name)
		}
	}, [selectedPlot, setValue])

	const onSubmit = async (data: Input) => {
		console.log(data)
		await editPlot(id, data.name)
		closeWindow()
	}

	return (
		<div className='fixed min-w-screen min-h-screen left-0 bottom-0 flex place-content-center place-items-center bg-black/30'>
			<div className='bg-white rounded-xl p-5 w-1/2 space-y-5'>
				<div className='flex justify-between items-center'>
					<h1 className='text-lg font-bold'>Изменение участка</h1>
					<Button onClick={closeWindow}>
						<X size={20} />
					</Button>
				</div>

				{loading ? (
					<div>Loading...</div>
				) : !selectedPlot ? (
					<div>Участок не найден</div>
				) : (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-3'
					>
						<Input
							placeholder='Название участка'
							defaultValue={selectedPlot.name}
							{...register('name', {
								required: true
							})}
						/>
						<Button type='submit'>Сохранить</Button>
					</form>
				)}
			</div>
		</div>
	)
}
