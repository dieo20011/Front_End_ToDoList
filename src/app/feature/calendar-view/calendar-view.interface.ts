export interface IDayListData {
  date: Date;
  isOtherMonth: boolean;
}

export interface CalendarRespone {
  id: string;
  title: string;
  description: string;
  status: number;
  fromDate: string;
  toDate: string;
  isHoliday?: boolean;
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
