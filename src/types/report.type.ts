import { Plan } from "./plan.type";

export type Report = {
    id: number;
    plan: Plan;
    fact: number;
    delta: number;
    date: string;
    whoSend: string;
    machine: string | null;
    comment: string | null;
};
