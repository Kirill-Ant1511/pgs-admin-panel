import { Machine } from './machine.type';

export type Plan = {
    id: number;
    plot: {
        id: number;
        name: string;
    };
    typeWork: {
        id: number;
        code: string;
        name: string;
    };
    subtypeWork: {
        id: number;
        code: string;
        name: string;
        unitMetering: string;
        typeWorkId: number;
    };
    productionName: string;
    volume: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    machines: Machine[];
};
