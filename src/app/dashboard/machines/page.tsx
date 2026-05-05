import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { MachineTable } from './MachineTable';
import { Pages } from '@/constants/page';

export default function page() {
    return (
        <div className='w-full p-2'>
            <div>
                <div className='flex items-center justify-between mb-5'>
                    <h1 className='text-xl font-semibold'>Станки</h1>
                    <Button>
                        <Link href={Pages.CREATE_MACHINE} className='flex items-center gap-1'>
                            <Plus size={20} />
                            <span>Добавить станок</span>
                        </Link>
                    </Button>
                </div>
            </div>
            <MachineTable />
        </div>
    );
}
