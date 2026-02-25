import { Plot } from "@/types/plot.type";
import axios from "axios";
import { create } from "zustand";

interface PlotState {
    plots: Plot[];
    selectedPlot: Plot | null;
    loading: boolean;
    getPlots: (nameSubstring?: string) => Promise<void>;
    getPlaningPlots: () => Promise<void>;
    getPlotById: (id: number) => Promise<void>;
    createPlot: (name: string) => Promise<void>;
    editPlot: (id: number, name: string) => Promise<void>;
    deletePlot: (id: number) => Promise<void>;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_HOST + "/plot";
export const usePlot = create<PlotState>((set) => ({
    plots: [],
    selectedPlot: null,
    loading: false,
    getPlots: async (nameSubstring?: string) => {
        try {
            set({ loading: true });
            var response = await axios.get(BACKEND_URL, {
                params: { nameSubstring: nameSubstring },
            });

            if (response.status === 200)
                set({ plots: response.data as Plot[] });
            console.log(response.data);
        } catch (err) {
            alert("Не удалось получить участки");
            console.error("Error fetching plots:", err);
        } finally {
            set({ loading: false });
        }
    },
    getPlaningPlots: async () => {
        try {
            set({ loading: true });
            var response = await axios.get(BACKEND_URL + "/planing");
            if (response.status === 200)
                set({ plots: response.data as Plot[] });
            console.log(response.data);
        } catch (err) {
            alert("Не удалось получить запланированные участки");
            console.error("Error fetching plots:", err);
        } finally {
            set({ loading: false });
        }
    },
    getPlotById: async (id: number) => {
        try {
            set({ loading: true });
            var response = await axios.get(`${BACKEND_URL} + /${id}`);
            if (response.status === 200)
                set({ selectedPlot: response.data as Plot });
            console.log(response.data);
        } catch (err) {
            alert("Не удалось получить участок по id");
            console.error("Error fetching plots:", err);
        } finally {
            set({ loading: false });
        }
    },
    createPlot: async (name: string) => {
        try {
            set({ loading: true });
            var response = await axios.post(BACKEND_URL, {
                name: name,
            });
            if (response.status === 200) {
                set((state) => ({
                    plots: [...state.plots, response.data as Plot],
                }));
                alert("Участок создан");
            }
            console.log(response.data);
        } catch (err) {
            alert("Не удалось создать участок");
            console.error("Error fetching plots:", err);
        } finally {
            set({ loading: false });
        }
    },
    editPlot: async (id: number, name: string) => {
        try {
            set({ loading: true });
            var response = await axios.patch(BACKEND_URL + `/${id}`, {
                name: name,
            });
            if (response.status === 200) {
                set((state) => ({
                    selectedPlot: response.data as Plot,
                    plots: state.plots.map((p) =>
                        p.id === id ? (response.data as Plot) : p,
                    ),
                }));
                alert("Участок изменён");
            }
            console.log(response.data);
        } catch (err) {
            alert("Не удалось изменить участок");
            console.error("Error fetching plots:", err);
        }
    },
    deletePlot: async (id: number) => {
        try {
            set({ loading: true });
            var response = await axios.delete(BACKEND_URL + `/${id}`);
            if (response.status === 200) {
                set((state) => ({
                    plots: state.plots.filter((p) => p.id !== id),
                }));
                alert("Участок удалён");
            }
            console.log(response.data);
        } catch (err) {
            alert("Не удалось удалить участок");
            console.error("Error fetching plots:", err);
        } finally {
            set({ loading: false });
        }
    },
}));
