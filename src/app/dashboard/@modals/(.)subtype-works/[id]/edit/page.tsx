import { EditSubtypeWorkForm } from "./EditSubtypeWorkForm";

interface Props {
    params: Promise<{ id: number }>;
}

export default async function EditSubtypeWorkPage({ params }: Props) {
    const { id } = await params;
    return <EditSubtypeWorkForm id={id} />;
}
