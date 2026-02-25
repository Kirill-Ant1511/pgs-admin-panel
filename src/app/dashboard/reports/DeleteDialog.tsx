import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useReport } from "@/store/report.store";
import { Report } from "@/types/report.type";
import { Trash } from "lucide-react";

interface Props {
    report: Report;
}
export function DeleteDialog({ report }: Props) {
    const { deleteReport } = useReport();

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
                        <p className="text-red-500">Удаление отчета</p>
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full mt-2 space-y-5">
                    <h1>Вы уверены что хотите удалить отчет: </h1>
                    <ul>
                        <li>
                            <span className="font-bold">Участок: </span>
                            {report.plan.plot.name}
                        </li>
                        <li>
                            <span className="font-bold">Вид работ: </span>
                            {report.plan.typeWork.name}
                        </li>
                        <li>
                            <span className="font-bold">Тип работ: </span>
                            {report.plan.subtypeWork.name}
                        </li>
                        <li>
                            <span className="font-bold">
                                Название выработки:{" "}
                            </span>
                            {report.plan.productionName}
                        </li>
                        <li>
                            <span className="font-bold">Объём: </span>
                            {report.plan.volume}
                        </li>
                        <li>
                            <span className="font-bold">Дата: </span>
                            {report.date}
                        </li>
                        <li>
                            <span className="font-bold">Факт: </span>
                            {report.fact}
                        </li>
                        <li>
                            <span className="font-bold">Кто отправил: </span>
                            {report.whoSend}
                        </li>
                        <li>
                            <span className="font-bold">Машина: </span>
                            {report.machine}
                        </li>
                        <li>
                            <span className="font-bold">Комментарий: </span>
                            {report.comment}
                        </li>
                    </ul>
                    <Button
                        onClick={async () => await deleteReport(report.id)}
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
