import { Report } from "@/types/report.type"
import axios from "axios"
import { create } from "zustand"

interface ReportState {
    reports: Report[]
    selectedReport: Report | null
    loading: boolean
    getAllReports: (page: number, pageSize: number, plotId?: number | null, typeWorkId?: number | null, subtypeWorkId?: number | null, productionName?: string | null, startDate?: string | null, endDate?: string | null) => Promise<void>

}


const BACKEND_URL = 'http://localhost:8080/report'

export const useReport = create<ReportState>((set) => ({
    reports: [],
    selectedReport: null,
    loading: false,
    getAllReports: async (page, pageSize, plotId, typeWorkId, subtypeWorkId, productionName, startDate, endDate) => {
        try {
            set({ loading: true })
            const params = {
                plotId: plotId,
                typeWorkId: typeWorkId,
                subtypeWorkId: subtypeWorkId,
                productionName: productionName,
                startDate: startDate,
                endDate: endDate,
                page: page,
                size: pageSize
            }
            const response = await axios.get(BACKEND_URL, {params: params})
            if (response.status === 200) set({ reports: response.data as Report[] })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }
    }
}))