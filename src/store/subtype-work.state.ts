import { SubtypeWork } from "@/types/subtype-work.type";
import axios from "axios";
import { create } from "zustand";

interface SubtypeWorkState {
    subtypeWorks: SubtypeWork[]
    loading: boolean
    selectedSubtypeWork: SubtypeWork | null
    getAllSubtypeWorks: () => Promise<void>
    getSubtypeWorkByTypeWorkId: (typeWorkId: number) => Promise<void>
}

const BACKEND_BASE_URL = "http://localhost:8080"


export const useSubtypeWork = create<SubtypeWorkState>(set => ({
    subtypeWorks: [],
    selectedSubtypeWork: null,
    loading: false,
    getAllSubtypeWorks: async () => {
        try {
            set({ loading: true })
            const response = await axios.get(BACKEND_BASE_URL + '/subtype-work')
            if (response.status === 200)
                set({ subtypeWorks: response.data as SubtypeWork[] })
        } catch (error) {
            console.log(error)
        } finally  {
            set({ loading: false })
        }
    },
    getSubtypeWorkByTypeWorkId: async (typeWorkId: number) => { 
        try {
            set({ loading: true })
            const response = await axios.get(BACKEND_BASE_URL + '/subtype-work/by-type-work/' + typeWorkId)
            if (response.status === 200)
                set({ subtypeWorks: response.data as SubtypeWork[] })
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    },
}))