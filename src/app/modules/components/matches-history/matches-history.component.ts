import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MatchComponent } from '../../../shared/match/match.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule } from '@angular/forms';
import { Match } from '../../models/match';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { RacketAnimationComponent } from '../../../shared/racket-animation/racket-animation.component';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-matches-history',
  standalone: true,
  templateUrl: './matches-history.component.html',
  styleUrl: './matches-history.component.scss',
  imports: [
    DropdownModule,
    MatchComponent,
    FormsModule,
    RacketAnimationComponent,
  ],
})
export class MatchesHistoryComponent implements OnInit {
  rivalList: User[] | undefined;
  rival: User | undefined;
  matches: Match[] = [];

  constructor(
    public spinnerService: SpinnerService,
    private _authService: AuthService,
    private _getFromFirebaseService: GetFromFirebaseService
  ) {}

  ngOnInit(): void {
    this._getRivalList();
  }

  rivalChanged() {
    const userUid = this._authService.currentUser()!.uid;
    const rivalUid = this.rival?.uid;
    if (rivalUid) {
      this.spinnerService.toTrueInnerSpinner();
      this._getFromFirebaseService
        .getUserMatchesWithRival(userUid, rivalUid)
        .subscribe((res) => {
          this.spinnerService.toFalseInnerSpinner();
          this.matches = res;
        });
    } else {
      this.matches = [];
    }
  }

  private _getRivalList() {
    const currentUserUid = this._authService.currentUser()?.uid;
    this._getFromFirebaseService
      .getRivalsList(currentUserUid)
      .subscribe((res) => {
        this.rivalList = res;
      });
  }
}
