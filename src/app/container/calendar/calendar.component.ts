import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {weekDays} from "../../shared/const";
import {DateModel} from "../../shared/calendar.model";
import {Subject, takeUntil} from "rxjs";
import {MatCalendar, MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {CalendarFacade} from "../../shared/store/calendar.facade";
import {Store} from "@ngrx/store";
import {AddCalendarElement, AddCurrentDate} from "../../shared/store/calendar.actions";
import {CalendarState} from "../../shared/store/calendar.state";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnDestroy{
  @ViewChild(MatCalendar) calendar: MatCalendar<Date>;
  public selected: Date | null = null;
  private selectedDates: any = [];
  private destroy$ = new Subject();
  constructor(
    private dialog: MatDialog,
    private toaster: ToastrService,
    private store: Store<CalendarState>,
    private facade: CalendarFacade) {
  }

  ngOnInit(): void {
    this.facade.calendarData$.pipe(takeUntil(this.destroy$)).subscribe(element => {
      if (!element || Object.keys(element).length === 0) {
        return;
      }
      this.selectedDates = Object.keys(element).map(x =>  {
        const reverseDate = x.split('/').reverse().join('/');
        return new Date(reverseDate);
      });
      this.changeColor();
      this.calendar.updateTodaysDate();
    });
  }

  changeColor() {
      this.calendar.dateClass = (d: Date): MatCalendarCellCssClasses => {
        return this.selectedDates.some(
          (item: Date) =>
            item.getFullYear() === d.getFullYear() &&
            item.getDate() === d.getDate() &&
            item.getMonth() === d.getMonth()
        ) ? "highlight-date" : '';
      }
  }

  onDateClick($event: any) {
   const arrDate: string[] = $event.toString().split(' ');
   const dataStore = this.facade.getCalendarState().calendarData;
   const date = new Date($event).toLocaleDateString();
   this.changeColor();
   const obj: DateModel = {
     date: new Date($event),
     weekDay: weekDays[arrDate[0]]
   };
    this.store.dispatch(new AddCurrentDate(obj));
    if (dataStore && dataStore[date]) {
      return;
    }
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: obj,
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.store.dispatch(new AddCalendarElement(result, obj));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
