import {Component, OnInit} from '@angular/core';
import {FormValidationService} from '../services/form-validation.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ILogin, ILoginResult} from './login.types';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(public formValidationService: FormValidationService,
              private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      password: [undefined, this.formValidationService.required.validator],
      username: [undefined, this.formValidationService.required.validator],
    });
  }

  submit(formData: ILogin) {
    this.authService.login(formData).subscribe((result: ILoginResult) => {
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        window.location.href = '/';
      } else {
        this.matSnackBar.open('ERROR: invalid username or password', undefined, {
          duration: 5000
        });
      }
    }, (err) => {
      this.matSnackBar.open('ERROR: could not login');
      console.error('ERROR: could not login', err);
    });

  }
}
