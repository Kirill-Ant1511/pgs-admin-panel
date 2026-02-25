import { EditTypeWorkForm } from "./EditTypeWorkForm";

interface Props {
    params: Promise<{ id: number }>;
}

export default async function EditTypeWorkModal({ params }: Props) {
    const { id } = await params;
    return <EditTypeWorkForm id={id} />;
}
