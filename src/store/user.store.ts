import { User } from '@/types/user.type';
import axios from 'axios';
import { create } from 'zustand';

interface UserState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    getAllUsers: () => Promise<void>;
    getUserByTelegramId: (telegramId: string) => Promise<void>;
    createUser: (
        name: string,
        surname: string,
        telegramId: string,
        role: string,
        plotIds: number[],
    ) => Promise<void>;
    updateUser: (
        id: number,
        name: string,
        surname: string,
        telegramId: string,
        role: string,
        plotIds: number[],
    ) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_HOST + '/users';

export const useUser = create<UserState>((set) => ({
    users: [],
    selectedUser: null,
    loading: false,
    getAllUsers: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(BACKEND_URL);
            if (response.status === 200) set({ users: response.data as User[] });
            console.log(response.data);
        } catch (error) {
            alert('Не удалось получить пользователя');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    getUserByTelegramId: async (telegramId: string) => {
        try {
            console.log(process.env.BACKEND_HOST);
            set({ loading: true });
            const response = await axios.get(`${BACKEND_URL}/${telegramId}`);
            if (response.status === 200) set({ selectedUser: response.data as User });
            console.log(response.data);
        } catch (error) {
            alert('Не удалось получить пользователя');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    createUser: async (
        name: string,
        surname: string,
        telegramId: string,
        role: string,
        plotIds: number[],
    ) => {
        try {
            set({ loading: true });
            const response = await axios.post(BACKEND_URL, {
                name,
                surname,
                telegramId,
                role,
                plotIds,
            });
            if (response.status === 200) alert('Пользователь успешно создан');
        } catch (error) {
            alert('Не удалось создать пользователя');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    updateUser: async (
        id: number,
        name: string,
        surname: string,
        telegramId: string,
        role: string,
        plotIds: number[],
    ) => {
        try {
            set({ loading: true });
            const response = await axios.patch(`${BACKEND_URL}/${id}`, {
                name,
                surname,
                telegramId,
                role,
                plotIds,
            });
            if (response.status === 200) alert('Пользователь успешно обновлен');
        } catch (error) {
            alert('Не удалось обновить пользователя');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    deleteUser: async (id: number) => {
        try {
            set({ loading: true });
            const response = await axios.delete(`${BACKEND_URL}/${id}`);
            if (response.status === 200) alert('Пользователь успешно удален');
        } catch (error) {
            alert('Не удалось удалить пользователя');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
}));
