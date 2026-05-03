import { EditUserForm } from './EditUserForm';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditUserModal({ params }: Props) {
    const { id } = await params;
    return <EditUserForm telegramId={id} />;
}
