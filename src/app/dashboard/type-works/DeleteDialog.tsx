import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTypeWork } from "@/store/type-work.state";
import { TypeWork } from "@/types/type-work.type";
import { Trash } from "lucide-react";

interface Props {
    typeWork: TypeWork;
}

export function DeleteDialog({ typeWork }: Props) {
    const { deleteTypeWork } = useTypeWork();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <p className="text-red-500">Удаление вида работ</p>
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full mt-2 space-y-5">
                    <p>
                        Вы уверены что хотите удалить вид работ: "
                        {typeWork.name}"
                    </p>
                    <Button
                        onClick={async () => await deleteTypeWork(typeWork.id)}
                        className="w-fit"
                        variant="destructive"
                    >
                        Удалить
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
