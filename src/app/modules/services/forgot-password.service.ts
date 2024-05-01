import { Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  constructor(
    private _authService: Auth,
    private _spinnerService: SpinnerService
  ) {}

  getForm() {
    return new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  resetPassword(email: string): Observable<void> {
    this._spinnerService.toTrue();
    const promise = sendPasswordResetEmail(this._authService, email);
    return from(promise);
  }
}
