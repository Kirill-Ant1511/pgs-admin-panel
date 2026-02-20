import { Plan } from "@/types/plan.type";
import axios from "axios";
import { create } from "zustand";

interface PlanState {
    plans: Plan[]
    selectedPlan: Plan | null
    loading: boolean
    getAllPlans: (pageNumber: number, pageSize: number, plotId?: number | null, typeWorkId?: number | null, subtypeWorkId?: number | null, productionName?: string | null, isActive?: boolean | null) => Promise<void>
    getPlanById: (id: number) => Promise<void>
    createPlan: (plotId: number, typeWorkId: number, subtypeWorkId: number, volume: number, productionName?: string | null, startDate?: Date | null, endDate?: Date | null) => Promise<void>
    deletePlan: (id: number) => Promise<void>
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
    },
    createPlan: async (plotId: number, typeWorkId: number, subtypeWorkId: number, volume: number, productionName?: string | null, startDate?: Date | null, endDate?: Date | null) => { 
        try {
            set({loading: true})
            const data = {
                plotId: plotId,
                typeWorkId: typeWorkId,
                subtypeWorkId: subtypeWorkId,
                volume: volume,
                productionName: productionName,
                startDate: startDate,
                endDate: endDate
            }
            const response = await axios.post(BACKEND_URL, data)
            if (response.status === 200) console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            set({loading: false})
        }
    },
    deletePlan: async (id: number) => {
        try {
            set({loading: true})
            const response = await axios.delete(`${BACKEND_URL}/${id}`)
            if (response.status === 200) console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            set({loading: false})
        }
    }
}))