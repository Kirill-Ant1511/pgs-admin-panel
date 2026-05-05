import { Pages } from '@/constants/page';
import { MenuItem } from '@/types/menu.type';
import { Drill, Files, FileText, Hammer, Layers, Map, User } from 'lucide-react';

export const MENU: MenuItem[] = [
    {
        name: 'Пользователи',
        path: Pages.USERS,
        icon: User,
    },
    {
        name: 'Участки',
        path: Pages.PLOTS,
        icon: Map,
    },
    {
        name: 'Виды работ',
        path: Pages.TYPE_WORKS,
        icon: Hammer,
    },
    {
        name: 'Типы работ',
        path: Pages.SUBTYPE_WORKS,
        icon: Layers,
    },
    {
        name: 'Планы',
        path: Pages.PLANS,
        icon: FileText,
    },
    {
        name: 'Отчёты',
        path: Pages.REPORTS,
        icon: Files,
    },
    {
        name: 'Станки',
        path: Pages.MACHINES,
        icon: Drill,
    },
];
