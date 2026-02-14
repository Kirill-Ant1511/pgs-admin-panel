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
	const { getPlots, deletePlot } = usePlot()

	const deletePlotHandler = async () => {
		await deletePlot(plot.id)
		await getPlots(null)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className='text-red-500'
					variant='outline'
				>
					<Trash size={22} />
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
						onClick={deletePlotHandler}
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
