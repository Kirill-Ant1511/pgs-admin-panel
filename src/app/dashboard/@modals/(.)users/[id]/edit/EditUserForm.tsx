'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ModalBackground } from '@/components/ui/modal-background';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/userDebounce';
import { usePlot } from '@/store/plot.state';
import { useUser } from '@/store/user.store';
import { Plot } from '@/types/plot.type';
import { UserRole } from '@/types/user.type';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Label } from 'radix-ui';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
    telegramId: string;
}

interface Input {
    name: string;
    surname: string;
    telegramId: string;
    role: UserRole;
    plots: Plot[];
}

export function EditUserForm({ telegramId }: Props) {
    const router = useRouter();
    const [userRole, setUserRole] = useState<UserRole>('USER');
    const { updateUser, selectedUser, getUserByTelegramId, getAllUsers } = useUser();
    const { getPlots, plots } = usePlot();
    const [plotName, setPlotName] = useState<string>('');
    const [selectedPlots, setSelectedPlots] = useState<Plot[]>([]);
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const debounceName = useDebounce<string>(plotName, 300);
    const debounceFocus = useDebounce<boolean>(inputFocused, 100);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<Input>();

    const closeModal = () => {
        router.back();
    };

    const onSubmit = async (data: Input) => {
        console.log('data', data);
        if (!selectedUser) return;
        const plotIds = selectedPlots.map((plot) => plot.id);
        await updateUser(
            selectedUser.id,
            data.name,
            data.surname,
            data.telegramId,
            userRole,
            plotIds,
        );
        getAllUsers();
        closeModal();
    };

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        getUserByTelegramId(telegramId);
        getData();
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    useEffect(() => {
        console.log(selectedUser);
        setValue('name', selectedUser?.name || '');
        setValue('surname', selectedUser?.surname || '');
        setValue('telegramId', selectedUser?.telegramId || '');
        setValue('role', selectedUser?.role || 'USER');
        setUserRole(selectedUser?.role || 'USER');
        setSelectedPlots(selectedUser?.plots || []);
    }, [selectedUser]);
    const getData = async () => {
        await getPlots(debounceName);
    };
    const addPlots = (plot: Plot) => {
        if (selectedPlots.find((p) => p.id === plot.id)) return;
        setSelectedPlots([...selectedPlots, plot]);
    };

    const deletePlot = (id: number) => {
        setSelectedPlots(selectedPlots.filter((plot) => plot.id !== id));
    };
    useEffect(() => {
        getData();
    }, [debounceName]);

    if (!selectedUser) {
        return null;
    }

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
                    <FieldLabel htmlFor='name'>Имя(Обязательно)</FieldLabel>
                    <Input
                        id='name'
                        type='text'
                        {...register('name', { required: true })}
                        placeholder='Имя пользователя'
                    />
                </Field>
                <Field className='-space-y-2'>
                    <FieldLabel htmlFor='surname'>Фамилия(Обязательно)</FieldLabel>
                    <Input
                        id='surname'
                        type='text'
                        {...register('surname', { required: true })}
                        placeholder='Фамилия пользователя'
                    />
                </Field>
                <Field className='-space-y-2'>
                    <FieldLabel htmlFor='telegramId'>Telegram ID(Обязательно)</FieldLabel>
                    <Input
                        id='telegraId'
                        type='text'
                        {...register('telegramId', { required: true })}
                        placeholder='Telegram ID'
                    />
                </Field>
                <Field className='-space-y-2'>
                    <FieldLabel htmlFor='role'>Роль пользователя(Обязательно)</FieldLabel>
                    <Select
                        value={userRole}
                        onValueChange={(value) => setUserRole(value as UserRole)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder='Роль пользователя' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='PM'>PM</SelectItem>
                            <SelectItem value='USER'>USER</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <Field className='-space-y-2 relative'>
                    <FieldLabel htmlFor='plots'>Участки</FieldLabel>
                    <Input
                        id='telegraId'
                        type='text'
                        placeholder='Название участка'
                        value={plotName}
                        onChange={(e) => setPlotName(e.target.value)}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                    />
                    {debounceFocus && (
                        <div className='absolute flex flex-col w-full top-full bg-white border-2 rounded-lg'>
                            {plots.length !== 0 ? (
                                plots.map((plot) => (
                                    <button
                                        type='button'
                                        key={plot.id}
                                        className='hover:bg-zinc-300 transition-all'
                                        onClick={() => addPlots(plot)}
                                    >
                                        {plot.name}
                                    </button>
                                ))
                            ) : (
                                <div className='text-center'>Участков не найдено</div>
                            )}
                        </div>
                    )}
                    <div className='flex flex-wrap gap-3'>
                        {selectedPlots.length !== 0 &&
                            selectedPlots.map((plot) => (
                                <div
                                    key={plot.id}
                                    className='py-1 px-2 flex gap-1 items-center rounded-full border w-fit text-sm'
                                >
                                    <p>{plot.name}</p>
                                    <button type='button' onClick={() => deletePlot(plot.id)}>
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                    </div>
                </Field>

                <Button type='submit'>Изменить</Button>
            </form>
        </ModalBackground>
    );
}
