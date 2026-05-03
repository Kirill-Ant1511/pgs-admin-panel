'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pages } from '@/constants/page';
import { useUser } from '@/store/user.store';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DeleteDialog } from './DeleteDialog';
import { User, UserRole } from '@/types/user.type';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function UserTable() {
    const { users, getAllUsers, loading } = useUser();
    const [filterUser, setFilterUser] = useState<User[]>([]);
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [telegramId, setTelegramId] = useState<string>('');
    const [role, setRole] = useState<UserRole | 'Nothing'>('Nothing');

    const getUserByFilter = () => {
        const filtered = users.filter((user) => {
            return (
                (name !== '' ? user.name.toLowerCase().includes(name.toLowerCase()) : true) &&
                (surname !== ''
                    ? user.surname.toLowerCase().includes(surname.toLowerCase())
                    : true) &&
                (telegramId !== ''
                    ? user.telegramId.toLowerCase().includes(telegramId.toLowerCase())
                    : true) &&
                (role !== 'Nothing' ? user.role === role : true)
            );
        });
        setFilterUser(filtered);
    };

    const resetFilters = () => {
        setName('');
        setSurname('');
        setTelegramId('');
        setRole('Nothing');
        setFilterUser(users);
    };

    useEffect(() => {
        const getData = async () => {
            await getAllUsers();
        };

        getData();
    }, []);

    useEffect(() => {
        setFilterUser(users);
    }, [users]);

    if (loading) return <div>Загрузка...</div>;
    return (
        <>
            <div className='p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl space-y-3 mb-5'>
                <h1>Фильтры</h1>

                <Input
                    type='text'
                    placeholder='Имя'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='bg-accent'
                />
                <Input
                    type='text'
                    placeholder='Фамилия'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className='bg-accent'
                />
                <Input
                    type='text'
                    placeholder='Telegram ID'
                    value={telegramId}
                    onChange={(e) => setTelegramId(e.target.value)}
                    className='bg-accent'
                />
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger className='bg-accent w-full'>
                        <SelectValue placeholder='Роль пользователя' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='Nothing'>Без роли</SelectItem>
                        <SelectItem value='PM'>PM</SelectItem>
                        <SelectItem value='USER'>USER</SelectItem>
                    </SelectContent>
                </Select>
                <div className='space-x-2'>
                    <Button onClick={getUserByFilter}>Поиск</Button>
                    <Button onClick={resetFilters} variant='secondary'>
                        Сбросить фильтры
                    </Button>
                </div>
            </div>
            {users.length === 0 ? (
                <div className='w-full h-40 flex items-center justify-center text-muted-foreground'>
                    Нет данных для отображения
                </div>
            ) : (
                <Table className='w-full'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>ID</TableHead>
                            <TableHead className='text-center'>Название</TableHead>
                            <TableHead className='text-center'>Фамилия</TableHead>
                            <TableHead className='text-center'>Telegram ID</TableHead>
                            <TableHead className='text-center'>Роль</TableHead>
                            <TableHead className='text-center'>Участки</TableHead>
                            <TableHead className='text-center'>Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(users) &&
                            filterUser.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className='text-center'>{user.id}</TableCell>
                                    <TableCell className='text-center'>{user.name}</TableCell>
                                    <TableCell className='text-center'>{user.surname}</TableCell>
                                    <TableCell className='text-center'>{user.telegramId}</TableCell>
                                    <TableCell className='text-center'>{user.role}</TableCell>
                                    <TableCell className='text-center'>
                                        {user.plots?.length || 0}
                                    </TableCell>
                                    <TableCell className='flex gap-2 justify-center'>
                                        <Button variant='outline'>
                                            <Link
                                                href={Pages.EDIT_USER(user.telegramId)}
                                                scroll={false}
                                            >
                                                <Edit size={20} />
                                            </Link>
                                        </Button>
                                        <DeleteDialog user={user} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
}
