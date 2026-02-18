import { Plan } from "@/types/plan.type";
import axios from "axios";
import { create } from "zustand";

interface PlanState {
    plans: Plan[]
    selectedPlan: Plan | null
    loading: boolean
    getAllPlans: (pageNumber: number, pageSize: number, plotId?: number, typeWorkId?: number, subtypeWorkId?: number, productionName?: string, isActive?: boolean) => Promise<void>
    getPlanById: (id: number) => Promise<void>
}


const BACKEND_URL = "http://localhost:8080/plan";

export const usePlan = create<PlanState>(set => ({
    plans: [],
    selectedPlan: null,
    loading: false,
    getAllPlans: async (pageNumber: number, pageSize: number, plotId?: number, typeWorkId?: number, subtypeWorkId?: number, productionName?: string, isActive?: boolean) => { 
        try {
            set({ loading: true })
            let response = await axios.get(BACKEND_URL, {
                params: {
                    page: pageNumber,
                    size: pageSize,
                    plotId: plotId,
                    typeWorkId: typeWorkId,
                    subtypeWorkId: subtypeWorkId,
                    productionName: productionName,
                    isActive: isActive
                }
            })
            if (response.status === 200) set({  plans: response.data as Plan[] })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    },
    getPlanById: async (id: number) => {
    }
}))