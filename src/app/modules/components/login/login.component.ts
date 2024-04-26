import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../models/login-form';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, PasswordModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup<LoginForm>;

  constructor(private _loginService: LoginService) {}

  ngOnInit(): void {
    this.form = this._loginService.getForm();
  }

  save() {
    console.log(this.form.value);
  }
}
