import { IHoliday } from "../holiday/holiday.interface";

export interface IDayListData {
  date: Date;
  isOtherMonth: boolean;
}

export interface IHolidayAll {
  items: IHoliday[];
}

export interface CalendarRespone {
  id: string;
  title: string;
  description: string;
  fromDate: string;
  toDate: string;
  isHoliday?: boolean;
  status: ToDoStatus;
  isUrgent?: boolean;
}

export enum ToDoStatus {
  Pending,
  InProgress,
  Done,
}

export const ToDoList = [
  { value: ToDoStatus.Pending, label: 'Pending' },
  { value: ToDoStatus.InProgress, label: 'In Progress' },
  { value: ToDoStatus.Done, label: 'Done' },
];
