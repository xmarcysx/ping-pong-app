import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../models/login-form';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { RegistrationComponent } from '../registration/registration.component';

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
  isLoginForm = true;
  form!: FormGroup<LoginForm>;

  constructor(private _loginService: LoginService) {}

  ngOnInit(): void {
    this.form = this._loginService.getForm();
  }

  save() {
    console.log(this.form.value);
  }
}
