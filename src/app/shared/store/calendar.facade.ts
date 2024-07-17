import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppCalendarState, getState} from "./calendar.state";
import {calendarData, currentDate} from "./calendar.selectors";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CalendarFacade {
  calendarData$ = this.store.pipe(select(calendarData));
  currentDate$ = this.store.pipe(select(currentDate));
  constructor(
    private readonly store: Store<AppCalendarState>
  ) {
  }

  getCalendarState() {
    return getState(this.store).calendarState;
  }
}
