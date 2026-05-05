import { EditMachineForm } from './EditMachineForm';

interface Props {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
    const { id } = await params;
    return <EditMachineForm id={Number(id)} />;
}
