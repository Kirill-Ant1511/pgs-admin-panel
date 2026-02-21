import { EditPlanForm } from "./EditPlanForm";

interface Props {
    params: Promise<{id: number}>
}

export default async function EditPlanModal({params}: Props) {
    const {id} = await params;
    return <EditPlanForm id={id} />
}
