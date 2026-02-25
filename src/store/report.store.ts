import { Report } from "@/types/report.type";
import axios from "axios";
import { create } from "zustand";

interface ReportState {
    reports: Report[];
    selectedReport: Report | null;
    loading: boolean;
    getAllReports: (
        page: number,
        pageSize: number,
        plotId?: number | null,
        typeWorkId?: number | null,
        subtypeWorkId?: number | null,
        productionName?: string | null,
        startDate?: string | null,
        endDate?: string | null,
    ) => Promise<void>;
    sendReport: (
        planId: number,
        fact: number,
        date: string,
        whoSend?: string | null,
        machine?: string | null,
        comment?: string | null,
    ) => Promise<void>;
    deleteReport: (id: number) => Promise<void>;
}

const BACKEND_URL = "http://localhost:8080/report";

export const useReport = create<ReportState>((set) => ({
    reports: [],
    selectedReport: null,
    loading: false,
    getAllReports: async (
        page,
        pageSize,
        plotId,
        typeWorkId,
        subtypeWorkId,
        productionName,
        startDate,
        endDate,
    ) => {
        try {
            set({ loading: true });
            const params = {
                plotId: plotId,
                typeWorkId: typeWorkId,
                subtypeWorkId: subtypeWorkId,
                productionName: productionName,
                startDate: startDate,
                endDate: endDate,
                page: page,
                size: pageSize,
            };
            const response = await axios.get(BACKEND_URL, { params: params });
            if (response.status === 200)
                set({ reports: response.data as Report[] });
        } catch (error) {
            alert("Не удалось получить отчёты");
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    sendReport: async (planId, fact, date, whoSend, machine, comment) => {
        try {
            const body = {
                planId: planId,
                fact: fact,
                date: date,
                whoSend: whoSend,
                machine: machine,
                comment: comment,
            };
            const response = await axios.post(BACKEND_URL, body);
            if (response.status === 200) {
                alert("Отчет успешно отправлен");
                set((state) => ({
                    reports: [...state.reports, response.data as Report],
                }));
            }
        } catch (error) {
            console.log(error);
            alert("Ошибка при отправке отчета");
        }
    },
    deleteReport: async (id) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/${id}`);
            if (response.status === 200) {
                set((state) => ({
                    reports: state.reports.filter((report) => report.id !== id),
                }));
                alert("Отчет успешно удален");
            }
        } catch (error) {
            console.log(error);
            alert("Ошибка при удалении отчета");
        }
    },
}));
