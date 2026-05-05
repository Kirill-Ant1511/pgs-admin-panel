import { Machine } from '@/types/machine.type';
import axios from 'axios';
import { create } from 'zustand';

interface MachineState {
    machines: Machine[];
    selectedMachine: Machine | null;
    loading: boolean;
    getAllMachines: (nameSubstring: string) => Promise<void>;
    getMachineById: (id: number) => Promise<void>;
    createMachine: (name: string) => Promise<void>;
    editMachine: (id: number, name: string) => Promise<void>;
    deleteMachine: (id: number) => Promise<void>;
}

export const useMachine = create<MachineState>((set) => ({
    machines: [],
    selectedMachine: null,
    loading: false,
    getAllMachines: async (nameSubstring: string) => {
        set({ loading: true });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/machine?nameSubstring=${nameSubstring}`,
            );
            if (response.status !== 200) {
                throw new Error('Failed to fetch machines');
            }
            const data = await response.data;
            set({ machines: data });
        } catch (error) {
            console.error('Error fetching machines:', error);
        } finally {
            set({ loading: false });
        }
    },
    getMachineById: async (id: number) => {
        set({ loading: true });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/machine/${id}`,
            );
            if (response.status !== 200) {
                throw new Error('Failed to fetch machine');
            }
            const data = await response.data;
            set({ selectedMachine: data });
        } catch (error) {
            console.error('Error fetching machine:', error);
        } finally {
            set({ loading: false });
        }
    },
    createMachine: async (name: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/machine`, {
                name,
            });
            if (response.status !== 200) {
                throw new Error('Failed to create machine');
            }
        } catch (error) {
            console.error('Error creating machine:', error);
        }
    },
    editMachine: async (id: number, name: string) => {
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/machine/${id}`,
                { name },
            );
            if (response.status !== 200) {
                throw new Error('Failed to edit machine');
            }
        } catch (error) {
            console.error('Error editing machine:', error);
        }
    },
    deleteMachine: async (id: number) => {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/machine/${id}`,
            );
            if (response.status !== 200) {
                throw new Error('Failed to delete machine');
            }
        } catch (error) {
            console.error('Error deleting machine:', error);
        }
    },
}));
