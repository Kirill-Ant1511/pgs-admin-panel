import { Machine } from '@/types/machine.type';
import { Plan } from '@/types/plan.type';
import axios from 'axios';
import { create } from 'zustand';

interface PlanState {
    plans: Plan[];
    selectedPlan: Plan | null;
    loading: boolean;
    getAllPlans: (
        pageNumber: number,
        pageSize: number,
        plotId?: number | null,
        typeWorkId?: number | null,
        subtypeWorkId?: number | null,
        productionName?: string | null,
        isActive?: boolean | null,
    ) => Promise<void>;
    getPlanByFK: (
        plotId: number,
        typeWorkId: number,
        subtypeWorkId: number,
        productionName: string,
        isActive: boolean,
    ) => Promise<void>;
    getPlanById: (id: number) => Promise<void>;
    createPlan: (
        plotId: number,
        typeWorkId: number,
        subtypeWorkId: number,
        volume: number,
        productionName?: string | null,
        startDate?: Date | null,
        endDate?: Date | null,
    ) => Promise<void>;
    updatePlan: (
        id: number,
        plotId: number,
        typeWorkId: number,
        subtypeWorkId: number,
        volume: number,
        isActive: boolean,
        machines: number[],
        productionName?: string | null,
        startDate?: Date | null,
        endDate?: Date | null,
    ) => Promise<void>;
    deletePlan: (id: number) => Promise<void>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_HOST + '/plan';

export const usePlan = create<PlanState>((set) => ({
    plans: [],
    selectedPlan: null,
    loading: false,
    getAllPlans: async (
        pageNumber: number,
        pageSize: number,
        plotId?: number | null,
        typeWorkId?: number | null,
        subtypeWorkId?: number | null,
        productionName?: string | null,
        isActive?: boolean | null,
    ) => {
        try {
            set({ loading: true });
            let response = await axios.get(BACKEND_URL, {
                params: {
                    page: pageNumber,
                    size: pageSize,
                    plotId: plotId,
                    typeWorkId: typeWorkId,
                    subtypeWorkId: subtypeWorkId,
                    productionName: productionName,
                    isActive: isActive,
                },
            });
            if (response.status === 200)
                set({
                    plans: response.data as Plan[],
                });
            console.log(response.data);
        } catch (error) {
            alert('Не удалось получить планы');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    getPlanByFK: async (
        plotId: number,
        typeWorkId: number,
        subtypeWorkId: number,
        productionName: string,
        isActive: boolean,
    ) => {
        try {
            set({ loading: true });
            let response = await axios.get(`${BACKEND_URL}/by-fk`, {
                params: {
                    plotId: plotId,
                    typeWorkId: typeWorkId,
                    subtypeWorkId: subtypeWorkId,
                    productionName: productionName,
                    isActive: isActive,
                },
            });
            if (response.status === 200) {
                set({ selectedPlan: response.data as Plan });
            }
        } catch (error) {
            alert('Не удалось получить план по составному ключу');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    getPlanById: async (id: number) => {
        try {
            set({ loading: true });
            let response = await axios.get(`${BACKEND_URL}/${id}`);
            if (response.status === 200) set({ selectedPlan: response.data as Plan });
            console.log(response.data);
        } catch (error) {
            alert('Не удалось получить план по id');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    createPlan: async (
        plotId: number,
        typeWorkId: number,
        subtypeWorkId: number,
        volume: number,
        productionName?: string | null,
        startDate?: Date | null,
        endDate?: Date | null,
    ) => {
        try {
            set({ loading: true });
            const data = {
                plotId: plotId,
                typeWorkId: typeWorkId,
                subtypeWorkId: subtypeWorkId,
                volume: volume,
                productionName: productionName,
                startDate: startDate,
                endDate: endDate,
            };
            const response = await axios.post(BACKEND_URL, data);
            if (response.status === 200) {
                set((state) => ({
                    plans: [...state.plans, response.data as Plan],
                }));
                alert('План создан');
            }
        } catch (error) {
            alert('Не удалось создать план');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    updatePlan: async (
        id: number,
        plotId: number,
        typeWorkId: number,
        subtypeWorkId: number,
        volume: number,
        isActive: boolean,
        machines: number[],
        productionName?: string | null,
        startDate?: Date | null,
        endDate?: Date | null,
    ) => {
        try {
            set({ loading: true });
            const data = {
                plotId: plotId,
                typeWorkId: typeWorkId,
                subtypeWorkId: subtypeWorkId,
                volume: volume,
                productionName: productionName,
                startDate: startDate,
                endDate: endDate,
                isActive: isActive,
                machineIds: machines,
            };
            const response = await axios.patch(`${BACKEND_URL}/${id}`, data);
            if (response.status === 200) {
                set((state) => ({
                    selectedPlan: response.data as Plan,
                    plans: state.plans.map((p) => (p.id === id ? (response.data as Plan) : p)),
                }));
                alert('План изменён');
            }
        } catch (error) {
            alert('Не удалось изменить план');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    deletePlan: async (id: number) => {
        try {
            set({ loading: true });
            const response = await axios.delete(`${BACKEND_URL}/${id}`);
            if (response.status === 200) {
                set((state) => ({
                    plans: state.plans.filter((p) => p.id !== id),
                }));
                alert('План удалён');
            }
        } catch (error) {
            alert('Не удалось удалить план');
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
}));
