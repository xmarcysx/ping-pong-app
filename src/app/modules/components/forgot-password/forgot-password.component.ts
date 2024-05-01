import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { RegistrationComponent } from '../registration/registration.component';
import { Router } from '@angular/router';
import { ForgotPasswordForm } from '../../models/forgot-password-form';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  imports: [
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    FormSubmitBtnComponent,
    RegistrationComponent,
  ],
})
export class ForgotPassword implements OnInit {
  form!: FormGroup<ForgotPasswordForm>;

  constructor(
    private _forgotPasswordService: ForgotPasswordService,
    private _toastService: ToastService,
    private _authService: AuthService,
    private _spinnerService: SpinnerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._forgotPasswordService.getForm();
  }

  navigateToLogin() {
    this._router.navigateByUrl('/logowanie');
  }

  @HostListener('keydown.enter')
  save() {
    if (this.form.valid) {
      const email = this.form.getRawValue().email;
      this._forgotPasswordService.resetPassword(email).subscribe({
        next: () => {
          this._spinnerService.toFalse();
          this._router.navigateByUrl('/logowanie');
          this._toastService.success(
            'Email z linkiem do zresetowania hasła został wysłany'
          );
        },
        error: (err) => {
          this._spinnerService.toFalse();
          this._authService.handleAuthError(err);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
