import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsFormValue } from '../models/settings-form';
import {
  Auth,
  User,
  getAuth,
  updateCurrentUser,
  updateProfile,
} from '@angular/fire/auth';
import { from } from 'rxjs';
import { GetFromFirebaseService } from './get-from-firebase.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(
    private _authService: Auth,
    private _getFromFirebaseService: GetFromFirebaseService
  ) {}

  getForm() {
    return new FormGroup({
      username: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  save(form: SettingsFormValue) {
    const user = this._authService.currentUser as User;

    const promise = updateProfile(user, {
      displayName: form.username,
      photoURL: form.image,
    }).then(() => {
      this._getFromFirebaseService.updateCurrentUser(user.uid, form);
    });

    return from(promise);
  }
}
