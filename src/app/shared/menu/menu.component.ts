import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../modules/services/auth.service';
import { LogoutService } from '../../modules/services/logout.service';
import { SpinnerService } from '../../modules/services/spinner.service';
import { GetFromFirebaseService } from '../../modules/services/get-from-firebase.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private _logoutService: LogoutService,
    private _spinnerService: SpinnerService,
    private _getFromFirebase: GetFromFirebaseService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._getCurrentUserData();
  }

  logout() {
    this._logoutService.logout().subscribe(() => {
      this._spinnerService.toFalse();
      this._router.navigateByUrl('/logowanie');
    });
  }

  private _getCurrentUserData() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this._getFromFirebase.getCurrentUser(user!.uid).subscribe((res) => {
          this.authService.currentUser.set({
            profileImg: res?.profileImg!,
            username: res?.username!,
            loses: res?.loses!,
            wins: res?.wins!,
            uid: res?.uid!,
          });
        });
      }
    });
  }
}
