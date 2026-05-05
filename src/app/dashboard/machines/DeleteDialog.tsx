import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useMachine } from '@/store/machine.store';
import { Machine } from '@/types/machine.type';
import { Trash } from 'lucide-react';

interface Props {
    machine: Machine;
}

export function DeleteDialog({ machine }: Props) {
    const { deleteMachine, getAllMachines } = useMachine();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='destructive'>
                    <Trash size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <p className='text-red-500'>Удаление станка</p>
                    </DialogTitle>
                </DialogHeader>
                <div className='w-full mt-2 space-y-5'>
                    <p>Вы уверены что хотите удалить станок: "{machine.name}"?</p>
                    <DialogClose asChild>
                        <Button
                            onClick={async () => {
                                await deleteMachine(machine.id);
                                getAllMachines('');
                            }}
                            className='w-fit'
                            variant='destructive'
                        >
                            Удалить
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
