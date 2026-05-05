'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMachine } from '@/store/machine.store';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
    id: number;
}

interface Input {
    name: string;
}

export function EditMachineForm({ id }: Props) {
    const router = useRouter();
    const { selectedMachine, getMachineById, editMachine, getAllMachines, loading } = useMachine();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Input>({
        defaultValues: {
            name: '',
        },
    });
    const closeWindow = () => {
        router.back();
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    useEffect(() => {
        const getData = async () => {
            await getMachineById(id);
        };

        getData();
    }, [id]);

    useEffect(() => {
        if (selectedMachine) {
            setValue('name', selectedMachine.name);
        }
    }, [selectedMachine, setValue]);

    const onSubmit = async (data: Input) => {
        console.log(data);
        await editMachine(id, data.name);
        await getAllMachines('');
        closeWindow();
    };

    return (
        <div className='fixed min-w-screen min-h-screen left-0 bottom-0 flex place-content-center place-items-center bg-black/30'>
            <div className='bg-white rounded-xl p-5 w-1/2 space-y-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-bold'>Изменение станка</h1>
                    <Button onClick={closeWindow}>
                        <X size={20} />
                    </Button>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : !selectedMachine ? (
                    <div>Участок не найден</div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                        <Input
                            placeholder='Название станка'
                            defaultValue={selectedMachine.name}
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Button type='submit'>Сохранить</Button>
                    </form>
                )}
            </div>
        </div>
    );
}
