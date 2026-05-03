import { Plot } from './plot.type';

export type UserRole = 'PM' | 'USER';

export type User = {
    id: number;
    name: string;
    surname: string;
    telegramId: string;
    role: UserRole;
    plots: Plot[];
};
