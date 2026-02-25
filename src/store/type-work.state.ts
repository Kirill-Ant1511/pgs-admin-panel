import { TypeWork } from "@/types/type-work.type";
import axios from "axios";
import { create } from "zustand";

interface TypeWorkState {
    typeWorks: TypeWork[];
    selectedTypeWork: TypeWork | null;
    loading: boolean;
    getAllTypeWorks: (name?: string, code?: string) => Promise<void>;
    getPlaningTypeWorks: (plotId: number) => Promise<void>;
    getTypeWorkById: (id: number) => Promise<void>;
    createTypeWork: (code: string, name: string) => Promise<void>;
    updateTypeWork: (id: number, code: string, name: string) => Promise<void>;
    deleteTypeWork: (id: number) => Promise<void>;
}

const BACKEND_BASE_URL = process.env.BACKEND_HOST || "http://localhost:8080";

export const useTypeWork = create<TypeWorkState>((set) => ({
    typeWorks: [],
    selectedTypeWork: null,
    loading: false,
    getAllTypeWorks: async (name?: string, code?: string) => {
        try {
            console.log(process.env.BACKEND_HOST);
            set({ loading: true });
            const response = await axios.get(BACKEND_BASE_URL + "/type-work", {
                params: {
                    name: name,
                    code: code,
                },
            });
            if (response.status === 200)
                set({ typeWorks: response.data as TypeWork[] });
            console.log(response.data);
        } catch (error) {
            alert("Не удалось получить виды работ");
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    getPlaningTypeWorks: async (plotId: number) => {
        try {
            set({ loading: true });
            const response = await axios.get(
                BACKEND_BASE_URL + "/type-work/planing",
                {
                    params: {
                        plotId: plotId,
                    },
                },
            );
            if (response.status === 200)
                set({ typeWorks: response.data as TypeWork[] });
            console.log(response.data);
        } catch (error) {
            alert("Не удалось получить плановые виды работ");
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    getTypeWorkById: async (id: number) => {
        try {
            set({ loading: true });
            const response = await axios.get(
                BACKEND_BASE_URL + "/type-work/" + id,
            );
            if (response.status === 200)
                set({ selectedTypeWork: response.data as TypeWork });
            console.log(response.data);
        } catch (error) {
            alert("Не удалось получить вид работ по id");
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    createTypeWork: async (code: string, name: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(BACKEND_BASE_URL + "/type-work", {
                code,
                name,
            });
            if (response.status === 200) {
                set((state) => ({
                    typeWorks: [...state.typeWorks, response.data as TypeWork],
                }));
                alert("Вид работ создан");
            }
        } catch (error) {
            alert("Не удалось создать вид работ");
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    updateTypeWork: async (id: number, code: string, name: string) => {
        try {
            set({ loading: true });
            const response = await axios.patch(
                BACKEND_BASE_URL + "/type-work/" + id,
                {
                    code: code === "" ? null : code,
                    name: name === "" ? null : name,
                },
            );
            if (response.status === 200) {
                set((state) => ({
                    typeWorks: state.typeWorks.map((tw) =>
                        tw.id === id ? (response.data as TypeWork) : tw,
                    ),
                }));
                alert("Вид работ изменён");
            }
        } catch (error) {
            alert("Не удалось изменить вид работ");
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    deleteTypeWork: async (id: number) => {
        try {
            set({ loading: true });
            const response = await axios.delete(
                BACKEND_BASE_URL + "/type-work/" + id,
            );
            if (response.status === 200) {
                set((state) => ({
                    typeWorks: state.typeWorks.filter((tw) => tw.id !== id),
                }));
                alert("Вид работ удалён");
            }
        } catch (error) {
            alert("Не удалось удалить вид работ");
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
}));
