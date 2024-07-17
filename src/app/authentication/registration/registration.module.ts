import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationComponent} from "./registration.component";
import {CommonModule} from "@angular/common";
import {RegistrationRoutingModule} from "./registration-routing.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [],
})
export class RegistrationModule { }
