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

export interface IHolidayResponse {
    items: IHoliday[];
    totalRecord: number;
}

export interface IHolidayRequest {
    id?: number;
    name: string;
    fromDate: string;
    toDate: string;
    isAnnualHoliday: boolean;
    description: string;
}

export interface IHolidayRequestPaing {
    pageIndex: number;
    pageSize: number;
    keyword: string;
}