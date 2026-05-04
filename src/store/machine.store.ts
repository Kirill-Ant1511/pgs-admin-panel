import { Machine } from '@/types/machine.type';
import { create } from 'zustand';

interface MachineState {
    machines: Machine[];
    selectedMachine: Machine | null;
    loading: boolean;
    getAllMachines: (nameSubstring: string) => Promise<void>;
}

export const useMachine = create<MachineState>((set) => ({
    machines: [],
    selectedMachine: null,
    loading: false,
    getAllMachines: async (nameSubstring: string) => {
        set({ loading: true });
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/machine?nameSubstring=${nameSubstring}`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch machines');
            }
            const data = await response.json();
            set({ machines: data });
        } catch (error) {
            console.error('Error fetching machines:', error);
        } finally {
            set({ loading: false });
        }
    },
}));
