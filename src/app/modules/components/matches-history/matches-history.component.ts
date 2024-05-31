import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MatchComponent } from '../../../shared/match/match.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Match } from '../../models/match';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { RacketAnimationComponent } from '../../../shared/racket-animation/racket-animation.component';
import { SpinnerService } from '../../services/spinner.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-matches-history',
  standalone: true,
  templateUrl: './matches-history.component.html',
  styleUrl: './matches-history.component.scss',
  imports: [
    DropdownModule,
    MatchComponent,
    FormsModule,
    PaginatorModule,
    RacketAnimationComponent,
  ],
})
export class MatchesHistoryComponent implements OnInit {
  rivalList: User[] | undefined;
  rival: User | undefined;
  matches: Match[] = [];
  matchesList: Match[] = [];
  first: number = 0;
  rows: number = 5;

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
          this.matchesList = this.matches.slice(0, 5);
        });
    } else {
      this.matches = [];
      this.matchesList = [];
    }
  }

  getWinMatches(matches: Match[]): number {
    return matches?.filter((match) => match?.win)?.length;
  }

  getLoseMatches(matches: Match[]): number {
    return matches?.filter((match) => !match?.win)?.length;
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first as number;
    this.rows = event.rows as number;
    const from = (event.page as number) * 5;
    const to = from + 5;
    this.matchesList = this.matches.slice(from, to);
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
