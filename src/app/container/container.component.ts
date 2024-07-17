import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['container.component.scss']
})
export class ContainerComponent {
  constructor(private router: Router) {}

  logOut() {
    localStorage.removeItem('isLogged');
    localStorage.setItem('isLogged', JSON.stringify({isLogged: false}));
    this.router.navigateByUrl('login');
  }
}
