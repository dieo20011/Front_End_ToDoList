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
}

export enum ToDoStatus {
  Pending,
  InProgress,
  Done,
}

export const ToDoList = [
  { value: ToDoStatus.Pending, label: 'Chưa làm' },
  { value: ToDoStatus.InProgress, label: 'Đang tiến hành' },
  { value: ToDoStatus.Done, label: 'Hoàn thành' },
];
