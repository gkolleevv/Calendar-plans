import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('isLogged') as any);
    if (user?.isLogged) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }
}
