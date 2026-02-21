import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { usePlot } from '@/store/plot.state'
import { Plot } from '@/types/plot.type'
import { Trash } from 'lucide-react'

interface Props {
	plot: Plot
}
export function DeleteDialog({ plot }: Props) {
	const { deletePlot } = usePlot()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className=''
					variant='destructive'
				>
					<Trash size={20} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<p className='text-red-500'>Удаление участка</p>
					</DialogTitle>
				</DialogHeader>
				<div className='w-full mt-2 space-y-5'>
					<p>Вы уверены что хотите удалить участок: "{plot.name}"</p>
					<Button
						onClick={() => deletePlot(plot.id)}
						className='w-fit'
						variant='destructive'
					>
						Удалить
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
