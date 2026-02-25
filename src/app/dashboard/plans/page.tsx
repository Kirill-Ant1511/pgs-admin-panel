import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/page";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PlanTable } from "./PlanTable";

export default function PlanPage() {
    return (
        <div className="w-full p-2">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-xl font-semibold">Планы</h1>
                <Button>
                    <Link
                        href={Pages.CREATE_PLAN}
                        className="flex items-center gap-1"
                    >
                        <Plus size={20} />
                        <span>Добавить план</span>
                    </Link>
                </Button>
            </div>
            <PlanTable />
        </div>
    );
}
