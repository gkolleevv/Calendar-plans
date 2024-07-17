import {appStateCalendar, CalendarState, Registration} from "./calendar.state";
import {ActionTypeCalendar, AllCalendarActions} from "./calendar.actions";

export function calendarReducers(state: CalendarState = appStateCalendar.calendarState,
                                 action: AllCalendarActions): CalendarState {
  switch (action.type) {
    case ActionTypeCalendar.ADD_CALENDAR_ELEMENT_SUCCESS:
      return {
        ...state,
        calendarData: {
         ...action.obj
        }
      };
    case ActionTypeCalendar.UPDATE_CALENDAR_ELEMENT_SUCCESS:
      return {
        ...state,
        calendarData: {
          ...action.obj
        }
      };
    case ActionTypeCalendar.DELETE_CALENDAR_ELEMENT_SUCCESS:
      return {
        ...state,
        calendarData: {
          ...action.obj
        }
      };
    case ActionTypeCalendar.ADD_CURRENT_DATE:
      return {
        ...state,
        currentDate: {
          ...action.date
        }
      }
    default:
      return state;
  }
}

export function registrationReducer(state: Registration = appStateCalendar.registration,
                                 action: any): Registration {
  switch (action.type) {
    default:
      return state;
  }
}

export function isLoogedReducer(state: boolean = appStateCalendar.isLogged,
                                    action: any): boolean {
  switch (action.type) {
    default:
      return state;
  }
}
