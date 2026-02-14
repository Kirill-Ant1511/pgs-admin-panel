import { Pages } from '@/constants/page'
import { MenuItem } from '@/types/menu.type'
import { Files, FileText, Hammer, Layers, Map } from 'lucide-react'

export const MENU: MenuItem[] = [
	{
		name: 'Участки',
		path: Pages.PLOTS,
		icon: Map
	},
	{
		name: 'Виды работ',
		path: Pages.TYPE_WORKS,
		icon: Hammer
	},
	{
		name: 'Типы работ',
		path: Pages.SUBTYPE_WORKS,
		icon: Layers
	},
	{
		name: 'Планы',
		path: Pages.PLANS,
		icon: FileText
	},
	{
		name: 'Отчёты',
		path: Pages.REPORTS,
		icon: Files
	}
]
