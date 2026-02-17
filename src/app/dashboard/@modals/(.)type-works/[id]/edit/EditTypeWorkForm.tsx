'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ModalBackground } from '@/components/ui/modal-background'
import { useTypeWork } from '@/store/type-work.state'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
	id: number
}

interface Input {
	code: string
	name: string
}

export function EditTypeWorkForm({ id }: Props) {
	const router = useRouter()
	const { selectedTypeWork, getTypeWorkById, updateTypeWork, getAllTypeWorks } =
		useTypeWork()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<Input>()
	const closeModal = () => {
		document.body.classList.remove('overflow-hidden')
		router.back()
	}

	useEffect(() => {
		document.body.classList.add('overflow-hidden')
		const getData = async () => {
			await getTypeWorkById(id)
		}

		getData()
	}, [id])

	useEffect(() => {
		if (selectedTypeWork) {
			setValue('name', selectedTypeWork.name)
			setValue('code', selectedTypeWork.code)
		}
	}, [selectedTypeWork, setValue])

	const onSubmit = async (data: Input) => {
		await updateTypeWork(id, data.code, data.name)
		await getAllTypeWorks()
		closeModal()
	}

	if (!selectedTypeWork)
		return <ModalBackground>Такого типа работ не существует</ModalBackground>

	return (
		<ModalBackground>
			<div className='w-full flex justify-between items-center'>
				<h1>Изменение вида работ</h1>
				<Button onClick={closeModal}>
					<X size={22} />
				</Button>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mt-5 space-y-3'
			>
				<Field className='-space-y-2'>
					<FieldLabel htmlFor='code'>Код вида работ</FieldLabel>
					<Input
						id='code'
						type='text'
						defaultValue={selectedTypeWork.code}
						{...register('code')}
						placeholder='Код вида работ...'
					/>
				</Field>
				<Field className='-space-y-2'>
					<FieldLabel htmlFor='name'>Название вида работ</FieldLabel>
					<Input
						id='name'
						type='text'
						defaultValue={selectedTypeWork.name}
						{...register('name')}
						placeholder='Название вида работ...'
					/>
				</Field>

				<Button type='submit'>Сохранить</Button>
			</form>
		</ModalBackground>
	)
}
