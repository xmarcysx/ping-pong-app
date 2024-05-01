import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  RegistrationForm,
  RegistrationFormValue,
} from '../../models/registration-form';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  imports: [
    FormSubmitBtnComponent,
    ReactiveFormsModule,
    FormSubmitBtnComponent,
  ],
})
export class RegistrationComponent implements OnInit {
  @Output() changeFormToLogin = new EventEmitter<boolean>();

  form!: FormGroup<RegistrationForm>;

  constructor(
    private _registrationService: RegistrationService,
    private _toastService: ToastService,
    private _router: Router,
    private _authService: AuthService,
    private _spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.form = this._registrationService.getForm();
  }

  navigateToLogin() {
    this._router.navigateByUrl('/logowanie');
  }

  @HostListener('keydown.enter')
  save() {
    if (this.form.valid) {
      const fValue = this.form.getRawValue();

      if (fValue.password !== fValue.passwordRepeat) {
        this._toastService.error('Hasła nie są takie same');
        return;
      }

      this._handleRegistration(fValue);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private _handleRegistration(fValue: RegistrationFormValue) {
    this._registrationService
      .registerUser(fValue.email, fValue.username, fValue.password)
      .subscribe({
        next: () => {
          this._spinnerService.toFalse();
          this._router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this._spinnerService.toFalse();
          this._authService.handleAuthError(err);
        },
      });
  }
}
