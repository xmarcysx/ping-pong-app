import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../models/login-form';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { RegistrationComponent } from '../registration/registration.component';
import { Router } from '@angular/router';

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

  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit(): void {
    this.form = this._loginService.getForm();
  }

  navigateToRegistration() {
    this._router.navigateByUrl('/rejestracja');
  }

  navigateToForgotPassword() {
    this._router.navigateByUrl('/przypomnij-hasło');
  }

  save() {
    console.log(this.form.value);
  }
}
