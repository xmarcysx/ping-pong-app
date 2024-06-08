import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { map } from 'rxjs';
import { GetFromFirebaseService } from '../services/get-from-firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _getFromFirebase: GetFromFirebaseService,
    private _spinnerService: SpinnerService,
    private _router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authService.user$.pipe(
      map((user) => {
        if (user) {
          this._spinnerService.toTrue();
          this._getFromFirebase.getAllUsers().subscribe((res) => {
            this._getFromFirebase.users.set(res);
          });
          this._getFromFirebase.getCurrentUser(user!.uid).subscribe((res) => {
            this._authService.currentUser.set({
              profileImg: res?.profileImg!,
              username: res?.username!,
              loses: res?.loses!,
              wins: res?.wins!,
              uid: res?.uid!,
              kingOfTheDayWins: res?.kingOfTheDayWins!,
            });
          });
          return true;
        } else {
          this._router.navigate(['/logowanie']);
          return false;
        }
      })
    );
  }
}
