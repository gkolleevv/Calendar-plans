import {CalendarModel, DateModel} from "../calendar.model";
import {select, Store} from "@ngrx/store";
import {take} from "rxjs";

export interface CalendarState {
  calendarData: CalendarModel;
  currentDate: DateModel;
}

export interface AppCalendarState {
  calendarState: CalendarState;
  isLogged: boolean;
  registration: Registration;
}

export interface Registration {
  uName: string;
  uPassword: string;
}

export const appStateCalendar: AppCalendarState = {
  calendarState: {
    calendarData: {} as CalendarModel,
    currentDate: {} as DateModel
  },
  registration: {
    uName: '',
    uPassword: '',
  },
  isLogged: false
}

/**
 * getting synchronously state
 * by passing store as argument
 * @param store this.store (Store<AppCalendarState>)
 */
export const getState = (store: Store<AppCalendarState>): AppCalendarState => {
  let currentState: AppCalendarState;
  store.pipe(
    select((state:AppCalendarState) => state),
    take(1))
    .subscribe((o) => (currentState = JSON.parse(JSON.stringify(o))))
  // @ts-ignore
  return currentState;
};
