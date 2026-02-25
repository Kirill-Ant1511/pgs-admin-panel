import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { usePlan } from "@/store/plan.store";
import { usePlot } from "@/store/plot.state";
import { Plan } from "@/types/plan.type";
import { Plot } from "@/types/plot.type";
import { Trash } from "lucide-react";

interface Props {
    plan: Plan;
}
export function DeleteDialog({ plan }: Props) {
    const { getAllPlans, deletePlan } = usePlan();

    const deletePlanHandler = async () => {
        await deletePlan(plan.id);
        await getAllPlans(0, 10);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="" variant="destructive">
                    <Trash size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <p className="text-red-500">Удаление план</p>
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full mt-2 space-y-5">
                    <h1>Вы уверены что хотите удалить план: </h1>
                    <ul>
                        <li>
                            <span className="font-bold">Участок: </span>
                            {plan.plot.name}
                        </li>
                        <li>
                            <span className="font-bold">Вид работ: </span>
                            {plan.typeWork.name}
                        </li>
                        <li>
                            <span className="font-bold">Тип работ: </span>
                            {plan.subtypeWork.name}
                        </li>
                        <li>
                            <span className="font-bold">
                                Название выработки:{" "}
                            </span>
                            {plan.productionName}
                        </li>
                        <li>
                            <span className="font-bold">Объём: </span>
                            {plan.volume}
                        </li>
                    </ul>
                    <Button
                        onClick={deletePlanHandler}
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
