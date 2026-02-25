import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useSubtypeWork } from "@/store/subtype-work.state";
import { SubtypeWork } from "@/types/subtype-work.type";
import { Trash } from "lucide-react";

interface Props {
    subtypeWork: SubtypeWork;
}

export function DeleteDialog({ subtypeWork }: Props) {
    const { deleteSubtypeWork } = useSubtypeWork();

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
                        <p className="text-red-500">Удаление типа работ</p>
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full mt-2 space-y-5">
                    <p>
                        Вы уверены что хотите удалить тип работы: "
                        {subtypeWork.name}"
                    </p>
                    <DialogClose asChild>
                        <Button
                            onClick={() => deleteSubtypeWork(subtypeWork.id)}
                            className="w-fit"
                            variant="destructive"
                        >
                            Удалить
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
