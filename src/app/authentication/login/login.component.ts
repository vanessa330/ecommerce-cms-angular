import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (this.isLogin) {
      this.formGroup.removeControl('name');
      this.formGroup.removeControl('contactNumber');
    } else {
      this.formGroup.addControl(
        'name',
        new FormControl('', [Validators.required])
      );
    }
  }

  toggleLogin() {
    this.isLogin = !this.isLogin;
    this.initForm();
  }

  submitForm() {
    if (this.formGroup.valid) {
      if (this.isLogin) {
        this.authService.login(this.formGroup.value).subscribe(
          (res: any) => {
            this.router.navigate(['/dashboard']);
            this.store.dispatch(AuthActions.login({ token: res.token }));
          },
          (err: any) => {
            this.errorMessage = err.error.message;
          }
        );
      } else {
        this.authService.signup(this.formGroup.value).subscribe(
          (res: any) => {
            alert(res.message);
            location.reload();
          },
          (err: any) => {
            this.errorMessage = err.error.message;
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          }
        );
      }
    }
  }
}
