'use client';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pages } from '@/constants/page';
import { useMachine } from '@/store/machine.store';
import { Machine } from '@/types/machine.type';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DeleteDialog } from './DeleteDialog';
import { Input } from '@/components/ui/input';

export function MachineTable() {
    const { machines, getAllMachines } = useMachine();
    const [filterMachine, setFilterMachine] = useState<Machine[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        getAllMachines('');
    }, []);

    useEffect(() => {
        setFilterMachine(machines);
    }, [machines]);

    useEffect(() => {
        const filtered = machines.filter((machine) =>
            machine.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilterMachine(filtered);
    }, [searchTerm, machines]);

    return (
        <>
            <div className='p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl space-y-3 mb-5'>
                <h1>Фильтры</h1>
                <Input
                    type='text'
                    placeholder='Название станка'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {machines.length === 0 ? (
                <div className='w-full h-40 flex items-center justify-center text-muted-foreground'>
                    Нет данных для отображения
                </div>
            ) : (
                <Table className='w-full'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-center'>ID</TableHead>
                            <TableHead className='text-center'>Название</TableHead>
                            <TableHead className='text-center'>Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(machines) &&
                            filterMachine.map((machine) => (
                                <TableRow key={machine.id}>
                                    <TableCell className='text-center'>{machine.id}</TableCell>
                                    <TableCell className='text-center'>{machine.name}</TableCell>
                                    <TableCell className='flex gap-2 justify-center'>
                                        <Button variant='outline'>
                                            <Link
                                                href={Pages.EDIT_MACHINE(machine.id)}
                                                scroll={false}
                                            >
                                                <Edit size={20} />
                                            </Link>
                                        </Button>
                                        <DeleteDialog machine={machine} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
}
