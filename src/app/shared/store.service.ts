import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {CalendarModel, DateModel, TodoModel} from "./calendar.model";
import {CalendarFacade} from "./store/calendar.facade";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  dragEvent: BehaviorSubject<TodoModel | null> = new BehaviorSubject<TodoModel | null>(null);
  constructor(
    private facade: CalendarFacade
  ) {}



  public updateElement(element: TodoModel, id: number): Observable<CalendarModel> {
    const date = this.facade.getCalendarState().currentDate;
    let obj = this.facade.getCalendarState().calendarData;
    if (obj[date.date.toLocaleDateString()]) {
      obj[date.date.toLocaleDateString()] = obj[date.date.toLocaleDateString()].filter((x) => x.id !== id);
      obj[date.date.toLocaleDateString()].push(element);
    }
    return of(obj);
  }

  public addElementToStore(element: TodoModel, date: DateModel): Observable<CalendarModel> {
    const selectedDate = new Date(date.date);
    const newDate = selectedDate.toLocaleDateString();
    let obj = this.facade.getCalendarState().calendarData;
    switch (element.appearance) {
      case 'Selected day':
        if (obj[newDate]) {
          element.id = obj[newDate].length + 1;
          obj[newDate].push(element);
        } else {
          element.id = 0;
          obj = {
            ...obj,
            [newDate]: [element]
          }
        }
        break;
      case `Every ${date.weekDay} for 4 weeks`:
        const newDays = new Array();
        for (let i = 0; i < 4; i++) {
          newDays.push(
            new Date(selectedDate).toLocaleDateString()
          );
          selectedDate.setDate(selectedDate.getDate() + 7);
        }
        obj = this.mappedData(newDays, obj, element);
        break;
      case 'Whole month':
        const days = this.getDaysInMonth(selectedDate);
        obj = this.mappedData(days, obj, element);
        break;
      case 'Whole week':
        const week = this.getWeekDates(selectedDate);
        obj = this.mappedData(week, obj, element);
        break;
    }
    return of(obj);
  }



  private getWeekDates (current: Date): string[] {
    const week = new Array();
     current.setDate((current.getDate() - current.getDay() + 1));
    for (let i = 0; i < 7; i++) {
      week.push(
        new Date(current).toLocaleDateString()
      );
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

   private getDaysInMonth(current: Date): string[] {
    let date = new Date(current.getFullYear(), current.getMonth(), 1);
    let days = [];
    while (date.getMonth() === current.getMonth()) {
      days.push(new Date(date).toLocaleDateString());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  private mappedData(days: string[], obj: CalendarModel, element: TodoModel): CalendarModel {
    days.forEach(day => {
      if (obj[day]) {
        element.id = obj[day].length + 1;
        obj[day].push(element);
      } else {
        element.id = 0;
        obj = {
          ...obj,
          [day]: [element]
        }
      }
    });
    return obj;
  }

  public deleteElementFromStore(id: number): Observable<CalendarModel> {
    const dateStore = this.facade.getCalendarState().currentDate;
    let obj = this.facade.getCalendarState().calendarData;
    const date = new Date(dateStore.date).toLocaleDateString();
    obj[date] = obj[date].filter(x => x.id !== id);
    return of(obj);
  }
}
