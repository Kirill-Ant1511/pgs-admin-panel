import { Button } from "@/components/ui/button";

import { Pages } from "@/constants/page";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PlotsTable } from "./PlotsTable";

export default function PlotPage() {
    return (
        <div className="w-full p-2">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-xl font-semibold">Участки</h1>
                <Button>
                    <Link
                        href={Pages.CREATE_PLOT}
                        className="flex items-center gap-1"
                    >
                        <Plus size={22} />
                        <span>Добавить участок</span>
                    </Link>
                </Button>
            </div>
            <PlotsTable />
        </div>
    );
}
