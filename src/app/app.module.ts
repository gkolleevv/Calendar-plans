import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {AuthGuard} from "./shared/auth.guard";
import {ActionReducer, ActionReducerMap, MetaReducer, StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {calendarReducers, isLoogedReducer, registrationReducer} from "./shared/store/calendar.reducers";
import {CalendarEffects} from "./shared/store/calendar.effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {AppCalendarState, appStateCalendar} from "./shared/store/calendar.state";
import {ToastrModule} from "ngx-toastr";
import {localStorageSync} from "ngrx-store-localstorage";

export function localStorageSyncReducer(reducer: ActionReducer<AppCalendarState>): ActionReducer<AppCalendarState>{
  return localStorageSync({keys: ['isLogged', 'registration'], rehydrate: true})(reducer);
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

export const reducers: ActionReducerMap<any, any> = {
  calendarState: calendarReducers,
  isLogged: isLoogedReducer,
  registration: registrationReducer
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers,{
      metaReducers: metaReducers,
      initialState: appStateCalendar.calendarState,
      runtimeChecks: {
      strictActionImmutability: false,
        strictStateImmutability: false
      }}),
    EffectsModule.forRoot([CalendarEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    ToastrModule.forRoot(),
    RouterOutlet,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
