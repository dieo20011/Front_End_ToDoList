export interface IHoliday {
    id: number;
    name: string;
    fromDate: string;
    toDate: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isAnnualHoliday: boolean;
}

export interface IHolidayRequest {
    id?: number;
    name: string;
    fromDate: string;
    toDate: string;
    isAnnualHoliday: boolean;
    description: string;
}
