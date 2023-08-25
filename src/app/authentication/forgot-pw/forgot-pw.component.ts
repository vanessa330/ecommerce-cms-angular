import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.css', '../../app.component.css'],
})
export class ForgotPwComponent {
  errorMessage = '';
  noticeMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.initForm();
  }

  initForm() {}

  submitForm() {
    if (this.formGroup.valid) {
      this.authService.forgotPassword(this.formGroup.value).subscribe(
        (res: any) => {
          this.noticeMessage = res.message;
          setTimeout(() => {
            this.router.navigate(['/resetPassword']);
          }, 5000);
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
