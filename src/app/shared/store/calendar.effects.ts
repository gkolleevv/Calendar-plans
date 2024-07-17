import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {CalendarState} from "./calendar.state";
import {
  ActionTypeCalendar,
  AddCalendarElement,
  AddCalendarElementSuccess, DeleteCalendarElement, DeleteCalendarElementSuccess,
  UpdateCalendarElement, UpdateCalendarElementSuccess
} from "./calendar.actions";
import {catchError, mergeMap, of} from "rxjs";
import {StoreService} from "../store.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class CalendarEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<CalendarState>,
    private toaster: ToastrService,
    private calendarService: StoreService
  ) {
  }

  addCalendarElement$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypeCalendar.ADD_CALENDAR_ELEMENT),
    mergeMap((action: AddCalendarElement) =>
     this.calendarService.addElementToStore(action.element, action.date).pipe(
       mergeMap(res => {
         if (res) {
           this.toaster.success('New plan is added!', 'Success');
         }
        return [
           (new AddCalendarElementSuccess(res))
         ]
       }),
       catchError(err => {
        return of(this.toaster.error('New plan is not added!', 'ERROR'))
       })))
  ) as any);

  updateCalendarElement$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypeCalendar.UPDATE_CALENDAR_ELEMENT),
    mergeMap((action: UpdateCalendarElement) =>
      this.calendarService.updateElement(action.element, action.id).pipe(
        mergeMap(res => {
          if (res) {
            this.toaster.success('The plan is updated!', 'Success');
          }
         return   [
              (new UpdateCalendarElementSuccess(res))
            ]
        }),
        catchError(err => {
          return of(this.toaster.error('The plan is not updated!', 'ERROR'))
        })))
  ) as any);

  deleteCalendarElement$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypeCalendar.DELETE_CALENDAR_ELEMENT),
    mergeMap((action: DeleteCalendarElement) =>
      this.calendarService.deleteElementFromStore(action.id).pipe(
        mergeMap(res => {
          if (res) {
            this.toaster.success('The plan is removed!', 'Success');
          }
        return  [
            (new DeleteCalendarElementSuccess(res as any))
          ]
        }),
        catchError(err => {
          return of(this.toaster.error('The plan is not removed!', 'ERROR'))
        })))
  ) as any);
}
