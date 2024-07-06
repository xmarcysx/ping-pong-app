import { Component, OnInit } from '@angular/core';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { Match } from '../../models/match';
import { User } from '../../models/user';
import { KingOfTheDayWinnerComponent } from '../../../shared/king-of-the-day-winner/king-of-the-day-winner.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-king-of-the-day-history',
  standalone: true,
  templateUrl: './king-of-the-day-history.component.html',
  styleUrl: './king-of-the-day-history.component.scss',
  imports: [KingOfTheDayWinnerComponent, PaginatorModule],
})
export class KingOfTheDayHistoryComponent implements OnInit {
  kingOfTheDayHistory: Array<Array<Match>> = [];
  kingOfTheDayHistoryList: Array<Array<Match>> = [];
  first: number = 0;
  rows: number = 5;

  constructor(private _getFromFirebaseService: GetFromFirebaseService) {}

  ngOnInit(): void {
    this._getFromFirebaseService.getKingOfTheDayHistory().subscribe((res) => {
      this.kingOfTheDayHistory = res as Array<Array<Match>>;
      this.kingOfTheDayHistory = this.kingOfTheDayHistory.reverse();
      this.kingOfTheDayHistoryList = this.kingOfTheDayHistory.slice(
        this.first,
        this.rows
      );
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first as number;
    this.rows = event.rows as number;
    const from = (event.page as number) * 5;
    const to = from + 5;
    this.kingOfTheDayHistoryList = this.kingOfTheDayHistory.slice(from, to);
  }

  getWinner(matches: Match[]): User {
    const userMap: { [key: string]: { user: User; wins: number } } = {};

    matches.forEach((match) => {
      if (!userMap[match.youUid] && match.you) {
        userMap[match.youUid] = { user: match.you, wins: 0 };
      }
      if (!userMap[match.rivalUid] && match.rival) {
        userMap[match.rivalUid] = { user: match.rival, wins: 0 };
      }

      if (match.isApproved) {
        const youWin = match.yourResult > match.rivalResult;
        const rivalWin = match.rivalResult > match.yourResult;

        if (youWin) {
          userMap[match.youUid].wins += 1;
        } else if (rivalWin) {
          userMap[match.rivalUid].wins += 1;
        }
      }
    });

    const usersWithWins = Object.values(userMap);

    usersWithWins.sort((a, b) => b.wins - a.wins);

    return usersWithWins.map((entry) => entry.user)[0];
  }
}
