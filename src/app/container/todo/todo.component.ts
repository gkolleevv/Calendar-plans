import {Component, Input} from "@angular/core";
import {TodoModel} from "../../shared/calendar.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {Store} from "@ngrx/store";
import {DeleteCalendarElement, UpdateCalendarElement} from "../../shared/store/calendar.actions";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['todo.component.scss']
})
export class TodoComponent {
  @Input() todo: any = {};

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  removeElement(id: number) {
    this.store.dispatch(new DeleteCalendarElement(id));
  }

  editElement(element: TodoModel) {
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: element,
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.store.dispatch(new UpdateCalendarElement(result, (element.id as any)));
    });
  }
}
