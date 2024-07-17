import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppCalendarState} from "./calendar.state";

export const calendarSelector = createFeatureSelector<AppCalendarState>('calendarState');
export const calendarData = createSelector(calendarSelector, state => state.calendarState.calendarData);
export const currentDate = createSelector(calendarSelector, state => state.calendarState.currentDate);
