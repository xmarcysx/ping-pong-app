import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  constructor(
    private _authService: Auth,
    private _spinnerService: SpinnerService
  ) {}

  logout(): Observable<void> {
    this._spinnerService.toTrue();
    const promise = signOut(this._authService);
    return from(promise);
  }
}
