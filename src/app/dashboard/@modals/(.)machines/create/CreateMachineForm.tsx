'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useMachine } from '@/store/machine.store';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Input {
    name: string;
}

export function CreateMachineForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Input>();

    const { createMachine, getAllMachines } = useMachine();

    const closeWindow = () => {
        router.back();
    };

    const onSubmit = async (data: Input) => {
        await createMachine(data.name);
        await getAllMachines('');
        closeWindow();
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);
    return (
        <div className='fixed min-w-screen min-h-screen left-0 top-0 flex place-content-center place-items-center bg-black/30'>
            <div className='py-2 px-5 rounded-xl bg-white w-1/2 space-y-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-bold'>Создание станка</h1>
                    <Button onClick={closeWindow}>
                        <X size={20} />
                    </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <Field className='-space-y-2'>
                        <FieldLabel htmlFor='name'>Название станка</FieldLabel>
                        <Input
                            id='name'
                            type='text'
                            {...register('name')}
                            placeholder='Название станка...'
                        />
                    </Field>
                    <Button type='submit' variant='default'>
                        Создать
                    </Button>
                </form>
            </div>
        </div>
    );
}
