import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {ContainerComponent} from "./container.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {TodoComponent} from "./todo/todo.component";
import {TodosComponent} from "./todos/todos.component";
import {ContainerRoutingModule} from "./container-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    ContainerComponent,
    CalendarComponent,
    TodoComponent,
    TodosComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ContainerRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    DragDropModule
  ],
  providers: [],
})
export class ContainerModule { }
