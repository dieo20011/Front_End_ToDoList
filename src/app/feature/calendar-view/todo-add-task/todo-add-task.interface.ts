export interface ToDoAddRequest {
    title: string;
    description: string;
    status: number;
    fromDate: string;
    toDate: string;
    userId: string;
    isUrgent: boolean;
}