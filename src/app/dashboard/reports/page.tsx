import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/page";

import { Plus } from "lucide-react";
import Link from "next/link";
import ReportTable from "./ReportTable";

export default function ReportPage() {
	return <div className='w-full p-2'>
			<div className='flex items-center justify-between mb-5'>
				<h1 className='text-xl font-semibold'>Отчёты</h1>
				<Button>
					<Link
						href={Pages.REPORTS}
						className='flex items-center gap-1'
					>
						<Plus size={20} />
						<span>Отправить отчёт</span>
					</Link>
				</Button>
			</div>
			<ReportTable />
		</div>
}
