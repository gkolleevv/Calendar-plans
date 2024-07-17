import {Action} from "@ngrx/store";
import {CalendarModel, DateModel, TodoModel} from "../calendar.model";

export enum ActionTypeCalendar {
  ADD_CALENDAR_ELEMENT = '[Calendar] Add calendar element',
  ADD_CALENDAR_ELEMENT_SUCCESS = '[Calendar] Add calendar element success',
  ADD_CALENDAR_ELEMENT_ERROR = '[Calendar] Add calendar element error',
  UPDATE_CALENDAR_ELEMENT = '[Calendar] Update calendar element',
  UPDATE_CALENDAR_ELEMENT_SUCCESS = '[Calendar] Update calendar element success',
  UPDATE_CALENDAR_ELEMENT_ERROR = '[Calendar] Update calendar element error',
  DELETE_CALENDAR_ELEMENT = '[Calendar] Delete calendar element',
  DELETE_CALENDAR_ELEMENT_SUCCESS = '[Calendar] Delete calendar element success',
  DELETE_CALENDAR_ELEMENT_ERROR = '[Calendar] Delete calendar element error',
  ADD_CURRENT_DATE = '[Calendar] Add current date'
}

export class AddCurrentDate implements Action {
  public readonly type: ActionTypeCalendar.ADD_CURRENT_DATE = ActionTypeCalendar.ADD_CURRENT_DATE;
  constructor(
    public date: DateModel
  ) {}
}

export class AddCalendarElement implements Action {
  public readonly type: ActionTypeCalendar.ADD_CALENDAR_ELEMENT = ActionTypeCalendar.ADD_CALENDAR_ELEMENT;
  constructor(
    public element: TodoModel,
    public date: DateModel
  ) {}
}

export class AddCalendarElementSuccess implements Action {
  public readonly type: ActionTypeCalendar.ADD_CALENDAR_ELEMENT_SUCCESS = ActionTypeCalendar.ADD_CALENDAR_ELEMENT_SUCCESS;
  constructor(
    public obj: CalendarModel
  ) {}
}

export class UpdateCalendarElement implements Action {
  public readonly type: ActionTypeCalendar.UPDATE_CALENDAR_ELEMENT = ActionTypeCalendar.UPDATE_CALENDAR_ELEMENT;
  constructor(
    public element: TodoModel,
    public id: number
  ) {}
}

export class UpdateCalendarElementSuccess implements Action {
  public readonly type: ActionTypeCalendar.UPDATE_CALENDAR_ELEMENT_SUCCESS = ActionTypeCalendar.UPDATE_CALENDAR_ELEMENT_SUCCESS;
  constructor(
    public obj: CalendarModel
  ) {}
}

export class DeleteCalendarElement implements Action {
  public readonly type: ActionTypeCalendar.DELETE_CALENDAR_ELEMENT = ActionTypeCalendar.DELETE_CALENDAR_ELEMENT;
  constructor(
    public id: number
  ) {}
}

export class DeleteCalendarElementSuccess implements Action {
  public readonly type: ActionTypeCalendar.DELETE_CALENDAR_ELEMENT_SUCCESS = ActionTypeCalendar.DELETE_CALENDAR_ELEMENT_SUCCESS;
  constructor(
    public obj: CalendarModel
  ) {}
}

export type AllCalendarActions = AddCalendarElement
  | AddCurrentDate
  | AddCalendarElementSuccess
  | UpdateCalendarElementSuccess
  | DeleteCalendarElementSuccess
  | DeleteCalendarElement
  | UpdateCalendarElement;
