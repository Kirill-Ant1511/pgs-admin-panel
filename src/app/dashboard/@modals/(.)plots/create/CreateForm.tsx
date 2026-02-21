'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { usePlot } from '@/store/plot.state'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type Input = {
	name: string
}
export function CreateForm() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Input>()

	const { createPlot, getPlots } = usePlot()

	const closeWindow = () => {
		document.body.classList.remove('overflow-hidden')
		router.back()
	}

	const onSubmit = async (data: Input) => {
		await createPlot(data.name)
		closeWindow()
	}

	useEffect(() => {
		document.body.classList.add('overflow-hidden')
	}, [])
	return (
		<div className='fixed min-w-screen min-h-screen left-0 top-0 flex place-content-center place-items-center bg-black/30'>
			<div className='py-2 px-5 rounded-xl bg-white w-1/2 space-y-5'>
				<div className='flex justify-between items-center'>
					<h1 className='text-lg font-bold'>Создание участка</h1>
					<Button onClick={closeWindow}>
						<X size={20} />
					</Button>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-3'
				>
					<Field className='-space-y-2'>
						<FieldLabel htmlFor='name'>Название участка</FieldLabel>
						<Input
							id='name'
							type='text'
							{...register('name')}
							placeholder='Название участка...'
						/>
					</Field>
					<Button
						type='submit'
						variant='default'
					>
						Создать
					</Button>
				</form>
			</div>
		</div>
	)
}
