'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ModalBackground } from '@/components/ui/modal-background';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useSubtypeWork } from '@/store/subtype-work.state';
import { useTypeWork } from '@/store/type-work.state';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Inputs {
    code: string;
    name: string;
    unitMetering: string;
    typeWorkId: number;
}

export function CreateSubtypeWorkForm() {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<Inputs>();
    const { createSubtypeWork } = useSubtypeWork();
    const { typeWorks, getAllTypeWorks } = useTypeWork();

    useEffect(() => {
        const getData = async () => {
            await getAllTypeWorks();
        };
        getData();
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    const closeModal = () => {
        router.back();
    };
    const onSubmit = async (data: Inputs) => {
        await createSubtypeWork(
            data.code.toUpperCase(),
            data.name,
            data.unitMetering,
            data.typeWorkId,
        );
        closeModal();
    };

    return (
        <ModalBackground>
            <div className='flex w-full justify-between items-center'>
                <h1>Создание типа работы</h1>
                <Button onClick={closeModal}>
                    <X size={22} />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                <Field>
                    <FieldLabel htmlFor='code'>Код типа работы</FieldLabel>
                    <Input
                        id='code'
                        type='text'
                        {...register('code', { required: true })}
                        placeholder='Код типа работы'
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor='name'>Название типа работы</FieldLabel>
                    <Input
                        id='name'
                        type='text'
                        {...register('name', { required: true })}
                        placeholder='Название типа работы'
                    />
                </Field>
                <Field>
                    <FieldLabel htmlFor='name'>Единица измерения</FieldLabel>
                    <Input
                        id='unitMetering'
                        type='text'
                        {...register('unitMetering', { required: true })}
                        placeholder='Единица измерения'
                    />
                </Field>
                <Field>
                    <FieldLabel>Вид работ</FieldLabel>
                    <Controller
                        name='typeWorkId'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                onValueChange={(val) => onChange(val ? Number(val) : null)}
                                value={value != null ? value.toString() : ''}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Выберите вид работ' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Виды работ</SelectLabel>
                                        {typeWorks.map((typeWork) => (
                                            <SelectItem
                                                key={typeWork.id}
                                                value={typeWork.id.toString()}
                                            >
                                                {typeWork.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </Field>
                <Button type='submit' variant='default'>
                    Создать
                </Button>
            </form>
        </ModalBackground>
    );
}
