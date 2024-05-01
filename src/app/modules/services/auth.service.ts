import { Injectable, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { User } from '../models/user';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = user(this._authService);
  currentUser = signal<User | null | undefined>(undefined);

  constructor(
    private _authService: Auth,
    private _toastService: ToastService
  ) {}

  handleAuthError(error: any): void {
    console.log(error);

    switch (error.code) {
      case 'auth/email-already-in-use':
        this._toastService.error(
          'Podany adres e-mail jest już używany przez inne konto'
        );
        break;
      case 'auth/invalid-email':
        this._toastService.error('Nieprawidłowy adres email');
        break;
      case 'auth/invalid-credential':
        this._toastService.error('Podane hasło jest nieprawidłowe');
        break;
      case 'auth/network-request-failed':
        this._toastService.error(
          'Wystąpił błąd sieci (taki jak przekroczenie limitu czasu, przerwane połączenie lub nieosiągalny host)'
        );
        break;
      case 'auth/weak-password':
        this._toastService.error('Hasło powinno zawierać conajmniej 6 znaków');
        break;
      case 'auth/user-not-found':
        this._toastService.error('Podany użytkownik nie został znaleziony');
        break;
      case 'auth/wrong-password':
        this._toastService.error('Podane hasło jest nieprawidłowe');
        break;
      case 'auth/user-disabled':
        this._toastService.error('Podany użytkownik jest zablokowany');
        break;
      case 'auth/too-many-requests':
        this._toastService.error(
          'Dostęp do tego konta został tymczasowo wyłączony z powodu wielu nieudanych prób logowania'
        );
        break;
      default:
        this._toastService.error('Nieznany błąd');
        break;
    }
  }
}
