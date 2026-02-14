import { EditForm } from './EditForm'

interface Props {
	params: Promise<{ id: number }>
}

export default async function PlotEditModal({ params }: Props) {
	const { id } = await params
	return <EditForm id={id} />
}
