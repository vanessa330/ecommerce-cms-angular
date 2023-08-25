import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css', '../../app.component.css'],
})
export class ChangePwComponent implements OnInit {
  private auth = JSON.parse(localStorage.getItem('auth') || '{}');
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  formGroup: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.initForm();
  }

  initForm() {}

  submitForm() {
    if (this.formGroup.valid) {
        const httpOptions = {
          headers: {
            Authorization: `Bearer ${this.auth.token}`,
          },
        };
        this.authService
          .changePassword(this.formGroup.value, httpOptions)
          .subscribe(
            (res: any) => {
              alert(res.message);
              this.store.dispatch(AuthActions.logout());
              this.router.navigate(['/']); // user force to login again
            },
            (err) => {
              this.errorMessage = err.error.message;
              setTimeout(() => {
                this.errorMessage = '';
              }, 5000);
            }
          );
      
    }
  }
}
