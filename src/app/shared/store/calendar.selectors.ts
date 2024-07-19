import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppCalendarState, CalendarState} from "./calendar.state";

export const calendarSelector = createFeatureSelector<AppCalendarState>('calendarState');
export const calendarData = createSelector(calendarSelector, (state: any) => state.calendarData);
export const currentDate = createSelector(calendarSelector, (state: any) => state.currentDate);
