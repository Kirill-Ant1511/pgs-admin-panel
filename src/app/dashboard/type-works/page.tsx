import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/page";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TypeWorkTable } from "./TypeWorkTable";

export default function TypeWorkPage() {
    return (
        <section className="w-full">
            <div className="w-full flex justify-between items-center mb-5">
                <h1 className="text-xl font-semibold">Виды работ</h1>
                <Button>
                    <Link
                        href={Pages.CREATE_TYPE_WORK}
                        className="w-full flex items-center gap-1"
                    >
                        <Plus size={22} />
                        <span>Добавить вид работы</span>
                    </Link>
                </Button>
            </div>
            <TypeWorkTable />
        </section>
    );
}
