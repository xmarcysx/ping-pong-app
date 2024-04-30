import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  constructor(private _authService: Auth) {}

  logout(): Observable<void> {
    const promise = signOut(this._authService);
    return from(promise);
  }
}
