import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { updateProfile } from 'firebase/auth';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(private _authService: Auth) {}

  getForm() {
    return new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      passwordRepeat: new FormControl(null, Validators.required),
    });
  }

  registerUser(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this._authService,
      email,
      password
    ).then((res) =>
      updateProfile(res.user, {
        displayName: username,
        photoURL: null,
      })
    );
    return from(promise);
  }
}
