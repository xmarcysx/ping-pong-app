import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private _authService: Auth) {}

  getForm() {
    return new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this._authService,
      email,
      password
    ).then(() => {});
    return from(promise);
  }
}
