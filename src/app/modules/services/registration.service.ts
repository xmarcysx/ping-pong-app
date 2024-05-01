import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User, updateProfile } from 'firebase/auth';
import { Observable, from } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { firebaseConfig } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(
    private _http: HttpClient,
    private _authService: Auth,
    private _spinnerService: SpinnerService
  ) {}

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
    this._spinnerService.toTrue();
    const promise = createUserWithEmailAndPassword(
      this._authService,
      email,
      password
    ).then((res) => {
      updateProfile(res.user, {
        displayName: username,
        photoURL: null,
      });
      this._addUserToDatabase(res.user, username);
    });
    return from(promise);
  }

  private _addUserToDatabase(user: User, username: string) {
    this._http
      .post(`${firebaseConfig.databaseURL}/users.json`, {
        uid: user.uid,
        email: user.email,
        username: username,
        photoURL: null,
        loses: 0,
        wins: 0,
      })
      .subscribe();
  }
}
