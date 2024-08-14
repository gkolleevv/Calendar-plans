import {Component, OnDestroy, OnInit} from "@angular/core";
import {DateModel, TodoModel} from "../../shared/calendar.model";
import {Subject, switchMap, takeUntil, tap} from "rxjs";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {CalendarFacade} from "../../shared/store/calendar.facade";
import {AddCalendarElement} from "../../shared/store/calendar.actions";
import {CalendarState} from "../../shared/store/calendar.state";
import {StoreService} from "../../shared/store.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  public date: DateModel | null = null;
  public todos: TodoModel[] | null = null;
  private destroy$ = new Subject();
  constructor(
    private store: Store<CalendarState>,
    private facade: CalendarFacade,
    private service: StoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.facade.currentDate$.pipe(
      tap(date => {
        if (!date || Object.keys(date).length === 0) {
          return;
        }
        this.date = date;
      }),
      switchMap(() => this.facade.calendarData$),
      takeUntil(this.destroy$))
      .subscribe(element => {
        if (!element || Object.keys(element).length === 0) {
          return;
        }
        if (this.date) {
          this.todos = element[this.date.date.toLocaleDateString()];
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public addTodo() {
    const dateStore = this.facade.getCalendarState().currentDate;
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: dateStore
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (this.date) {
        this.store.dispatch(new AddCalendarElement(result, this.date));
      }
    });
  }

  public trackById(index: number, item: TodoModel): number {
    return item.id as number;
  }

  startDrag(event: any) {
    if (event) {
      this.service.dragEvent.next(event.source.data);
    }
  }
}
