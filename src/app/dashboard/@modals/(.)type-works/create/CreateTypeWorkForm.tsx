'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ModalBackground } from '@/components/ui/modal-background';
import { useTypeWork } from '@/store/type-work.state';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Input {
    code: string;
    name: string;
}

export function CreateTypeWorkForm() {
    const router = useRouter();

    const { createTypeWork, getAllTypeWorks } = useTypeWork();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Input>();

    const closeModal = () => {
        document.body.classList.remove('overflow-hidden');
        router.back();
    };

    const onSubmit = async (data: Input) => {
        await createTypeWork(data.code.toUpperCase(), data.name);
        closeModal();
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        <ModalBackground>
            <div className='flex w-full justify-between items-center'>
                <h1>Создания вида работы</h1>
                <Button onClick={closeModal}>
                    <X size={22} />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5 space-y-3'>
                <Field className='-space-y-2'>
                    <FieldLabel htmlFor='code'>Код вида работ(Обязательно)</FieldLabel>
                    <Input
                        id='code'
                        type='text'
                        {...register('code', { required: true })}
                        placeholder='Код вида работ...'
                    />
                </Field>
                <Field className='-space-y-2'>
                    <FieldLabel htmlFor='name'>Название вида работ(Обязательно)</FieldLabel>
                    <Input
                        id='name'
                        type='text'
                        {...register('name', { required: true })}
                        placeholder='Название вида работ...'
                    />
                </Field>

                <Button type='submit'>Создать</Button>
            </form>
        </ModalBackground>
    );
}
