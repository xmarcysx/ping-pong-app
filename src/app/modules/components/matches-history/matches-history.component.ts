import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MatchComponent } from '../../../shared/match/match.component';
import { User } from '../../models/user';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matches-history',
  standalone: true,
  templateUrl: './matches-history.component.html',
  styleUrl: './matches-history.component.scss',
  imports: [DropdownModule, MatchComponent, FormsModule],
})
export class MatchesHistoryComponent implements OnInit {
  rivalList: User[] | undefined;
  rival: User | undefined;

  constructor(
    private _authService: AuthService,
    private _getFromFirebase: GetFromFirebaseService
  ) {}

  ngOnInit(): void {
    this._getRivalList();
  }

  private _getRivalList() {
    const currentUserUid = this._authService.currentUser()?.uid;
    this._getFromFirebase.getRivalsList(currentUserUid).subscribe((res) => {
      this.rivalList = res;
      console.log(res);
    });
  }
}
