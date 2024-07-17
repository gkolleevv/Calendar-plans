import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "../login/login.component";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        FormsModule,
        MatButtonModule,
    ],
  providers: [],
})
export class LoginModule { }
