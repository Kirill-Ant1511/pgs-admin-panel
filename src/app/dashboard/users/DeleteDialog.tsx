import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useUser } from '@/store/user.store';
import { User } from '@/types/user.type';
import { Trash } from 'lucide-react';

interface Props {
    user: User;
}

export function DeleteDialog({ user }: Props) {
    const { deleteUser, getAllUsers } = useUser();

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
                        <p className='text-red-500'>Удаление пользователя</p>
                    </DialogTitle>
                </DialogHeader>
                <div className='w-full mt-2 space-y-5'>
                    <p>
                        Вы уверены что хотите удалить пользователя: "{user.name} {user.surname}"
                    </p>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                deleteUser(user.id);
                                getAllUsers();
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
