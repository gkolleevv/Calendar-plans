export interface TodoModel {
  id?: number;
  startHour: string;
  startMinutes: string;
  endHour: string;
  endMinutes: string;
  plan: string;
  appearance: string;
}

export interface CalendarModel {
 [date: string]: TodoModel[]
}

export interface DateModel {
  date: Date;
  weekDay: string;
}

export declare type hourMinutesType = 'startHour' | 'endHour' | 'startMinutes' | 'endMinutes';
