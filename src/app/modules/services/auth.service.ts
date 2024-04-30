import { Injectable, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = user(this._authService);
  currentUser = signal<User | null | undefined>(undefined);

  constructor(private _authService: Auth) {}
}
