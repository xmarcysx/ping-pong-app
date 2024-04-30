import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../modules/services/auth.service';
import { LogoutService } from '../../modules/services/logout.service';

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
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.authService.currentUser.set({
        profileImg: user?.photoURL!,
        username: user?.displayName!,
      });
    });
  }

  logout() {
    this._logoutService.logout().subscribe(() => {
      this._router.navigateByUrl('/logowanie');
    });
  }
}
