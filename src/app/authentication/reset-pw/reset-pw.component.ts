import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.css', '../../app.component.css'],
})
export class ResetPwComponent {
  oneTimeToken: string | null = null;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.initForm();
    this.oneTimeToken = this.route.snapshot.paramMap.get('oneTimeToken');
  }

  initForm() {}

  submitForm() {
    if (this.formGroup.valid) {
      this.authService
        .resetPassword(this.oneTimeToken, this.formGroup.value)
        .subscribe(
          (res: any) => {
            alert(res.message);
            this.router.navigate(['/']);
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
