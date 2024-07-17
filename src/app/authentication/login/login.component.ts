import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = {} as FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      passWord: new FormControl('', [Validators.required])
    });
  }

  loginGo(): void {
    let register = localStorage.getItem('registration');
    let isLogged = localStorage.getItem('isLogged');
    if (register && isLogged) {
      register = JSON.parse(register);
      if (this.loginForm.controls['username'].value !== (register as any).uName || this.loginForm.controls['passWord'].value !== (register as any).uPassword) {
        this.toaster.warning('Wrong credentials!', 'WARNING');
      }else {
        this.toaster.success('Login successfull!', 'SUCCESS');
        localStorage.removeItem('isLogged');
        localStorage.setItem('isLogged', JSON.stringify({isLogged: true}));
        this.router.navigateByUrl('calendar');
      }
    } else {
      this.toaster.warning('Wrong credentials!', 'WARNING');
    }
  }

}
