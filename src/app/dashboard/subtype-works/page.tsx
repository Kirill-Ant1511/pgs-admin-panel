import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/page";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SubtypeWorkTable } from "./SubtypeWorkTable";

export default function SubtypeWorkPage() {
	return <div className='w-full p-2'>
			<div className='flex items-center justify-between mb-5'>
				<h1 className='text-xl font-semibold'>Типы работ</h1>
				<Button>
					<Link
						href={Pages.CREATE_SUBTYPE_WORK}
						className='flex items-center gap-1'
					>
						<Plus size={22} />
						<span>Добавить тип работ</span>
					</Link>
				</Button>
			</div>
			<SubtypeWorkTable />
		</div>
}
