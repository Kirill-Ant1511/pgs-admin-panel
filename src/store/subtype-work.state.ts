import { SubtypeWork } from "@/types/subtype-work.type";
import axios from "axios";
import { create } from "zustand";

interface SubtypeWorkState {
    subtypeWorks: SubtypeWork[]
    loading: boolean
    selectedSubtypeWork: SubtypeWork | null
    getAllSubtypeWorks: (page: number, size: number, name?: string | null, code?: string | null, typeWorkId?: number | null) => Promise<void>
    getSubtypeWorkById: (id: number) => Promise<void>
    getSubtypeWorkByTypeWorkId: (typeWorkId: number) => Promise<void>
    createSubtypeWork: (code: string, name: string, unitMetering: string, typeWorkId: number) => Promise<void>
    updateSubtypeWork: (id: number, code: string, name: string, unitMetering: string, typeWorkId: number) => Promise<void>
    deleteSubtypeWork: (id: number) => Promise<void>
}

const BACKEND_BASE_URL = "http://localhost:8080/subtype-work"


export const useSubtypeWork = create<SubtypeWorkState>(set => ({
    subtypeWorks: [],
    selectedSubtypeWork: null,
    loading: false,
    getAllSubtypeWorks: async (page: number, size: number, name?: string | null, code?: string | null, typeWorkId?: number | null) => {
        try {
            set({ loading: true })
            const params = {
                pageNumber: page,
                pageSize: size,
                name: name,
                code: code,
                typeWorkId: typeWorkId
            }
            const response = await axios.get(BACKEND_BASE_URL + '/with-filters', { params })
            if (response.status === 200)
                set({ subtypeWorks: response.data as SubtypeWork[] })
        } catch (error) {
            console.log(error)
        } finally  {
            set({ loading: false })
        }
    },
    getSubtypeWorkById: async (id: number) => {
        try {
            set({ loading: true })
            const response = await axios.get(BACKEND_BASE_URL + '/' + id)
            if (response.status === 200)
                set({ selectedSubtypeWork: response.data as SubtypeWork })
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    },
    getSubtypeWorkByTypeWorkId: async (typeWorkId: number) => { 
        try {
            set({ loading: true })
            const response = await axios.get(BACKEND_BASE_URL + '/by-type-work/' + typeWorkId)
            if (response.status === 200)
                set({ subtypeWorks: response.data as SubtypeWork[] })
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    },
    createSubtypeWork: async (code: string, name: string, unitMetering: string, typeWorkId: number) => {
        try {
            set({ loading: true })
            const body = {
                    code: code, 
                    name: name, 
                    unitMetering: unitMetering, 
                    typeWorkId: typeWorkId
            }
                const response = await axios.post(BACKEND_BASE_URL, body)
            if (response.status === 201) {
                set(state => ({ subtypeWorks: [...state.subtypeWorks, response.data as SubtypeWork] }))
            }
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    },
    updateSubtypeWork: async (id: number, code: string, name: string, unitMetering: string, typeWorkId: number) => {
        try {
            set({ loading: true })
            const body = {
                code: code,
                name: name,
                unitMetering: unitMetering,
                typeWorkId: typeWorkId
            }
            const response = await axios.patch(BACKEND_BASE_URL + '/' + id, body)
            if (response.status === 200) {
                set(state => ({ selectedSubtypeWork: response.data as SubtypeWork, subtypeWorks: state.subtypeWorks.map(sw => sw.id === id ? response.data as SubtypeWork : sw) }))
            }
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    },
    deleteSubtypeWork: async (id: number) => {
        try {
            set({ loading: true })
            const response = await axios.delete(BACKEND_BASE_URL + '/' + id)
            if (response.status === 200) {
                set(state => ({ subtypeWorks: state.subtypeWorks.filter(sw => sw.id !== id) }))
            }
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    }
}))