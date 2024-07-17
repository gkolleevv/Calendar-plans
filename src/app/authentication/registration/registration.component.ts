import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../shared/validators/password-validator';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = {} as FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl('',
        [Validators.required, Validators.pattern('^[a-zA-Z]{3,199}$')]),
      lastName: new FormControl('',
        [Validators.required, Validators.pattern('^[a-zA-Z]{3,199}$')]),
      email: new FormControl('',
        [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      userName: new FormControl('',
        [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{4,50}$')]),
      password: new FormControl('',
        [Validators.required,  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]{8,30}$')]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit(): void {
    this.toaster.success('Registration successfull!', 'SUCCESS');
    this.router.navigateByUrl('login');
    const myObj = {uName: this.registrationForm.controls['userName'].value, uPassword: this.registrationForm.controls['password'].value};
    localStorage.setItem('registration', JSON.stringify(myObj));
    localStorage.setItem('isLogged', JSON.stringify({isLogged: false}));
  }


}
