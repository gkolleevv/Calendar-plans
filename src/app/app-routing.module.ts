import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./shared/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./authentication/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./container/container.module').then(m => m.ContainerModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
