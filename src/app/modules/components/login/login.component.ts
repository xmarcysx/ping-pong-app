import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../models/login-form';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { RegistrationComponent } from '../registration/registration.component';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { AuthService } from '../../services/auth.service';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    FormSubmitBtnComponent,
    RegistrationComponent,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup<LoginForm>;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _authService: AuthService,
    private _spinnerService: SpinnerService,
    private _getFromFirebase: GetFromFirebaseService
  ) {}

  ngOnInit(): void {
    this.form = this._loginService.getForm();
  }

  navigateToRegistration() {
    this._router.navigateByUrl('/rejestracja');
  }

  navigateToForgotPassword() {
    this._router.navigateByUrl('/przypomnij-hasło');
  }

  @HostListener('keydown.enter')
  save() {
    if (this.form.valid) {
      const fValue = this.form.getRawValue();
      this._loginService.login(fValue.email, fValue.password).subscribe({
        next: () => {
          this._spinnerService.toFalse();
          this._router.navigateByUrl('/dashboard');
          this._saveCurrentUserData();
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

  private _saveCurrentUserData() {
    this._authService.user$.subscribe((user) => {
      this._getFromFirebase.getCurrentUser(user!.uid).subscribe((res) => {
        this._authService.currentUser.set({
          profileImg: res?.profileImg!,
          username: res?.username!,
          loses: res?.loses!,
          wins: res?.wins!,
          uid: res?.uid!,
        });
      });
    });
  }
}
