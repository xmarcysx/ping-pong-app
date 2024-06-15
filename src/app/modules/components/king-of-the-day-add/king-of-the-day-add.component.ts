import { Component } from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../../shared/add-match/add-match.component';
import { Match } from '../../models/match';
import { MatchComponent } from '../../../shared/match/match.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { LiveTableKingOfTheDayComponent } from '../../../shared/live-table-king-of-the-day/live-table-king-of-the-day.component';
import { User } from '../../models/user';
import { SaveKingOfTheDayComponent } from '../../../shared/save-king-of-the-day/save-king-of-the-day.component';

@Component({
  selector: 'app-king-of-the-day-add',
  standalone: true,
  templateUrl: './king-of-the-day-add.component.html',
  styleUrl: './king-of-the-day-add.component.scss',
  imports: [
    FormSubmitBtnComponent,
    MatchComponent,
    PaginatorModule,
    LiveTableKingOfTheDayComponent,
  ],
})
export class KingOfTheDayAddComponent {
  matchesList: Match[] = [];
  matches: Match[] = [];
  dialog: DynamicDialogRef | undefined;
  first: number = 0;
  rows: number = 5;

  constructor(private _dialogSerivce: DialogService) {}

  openAddMatchDialog() {
    const screenWidth = window.innerWidth;
    const dialogWidth = screenWidth > 992 ? '50vw' : '90vw';

    this.dialog = this._dialogSerivce.open(AddMatchComponent, {
      header: 'Dodaj wynik meczu',
      width: dialogWidth,
      height: 'auto',
      data: {
        isKingOfTheDayMode: true,
      },
    });

    this.dialog.onClose.subscribe((res) => {
      if (res) {
        this.matches.unshift(res);
        this.matchesList = this.matches.slice(0, 5);
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first as number;
    this.rows = event.rows as number;
    const from = (event.page as number) * 5;
    const to = from + 5;
    this.matchesList = this.matches.slice(from, to);
  }

  openKingOfTheDayLive() {
    const screenWidth = window.innerWidth;
    const dialogWidth = screenWidth > 992 ? '50vw' : '90vw';

    this.dialog = this._dialogSerivce.open(LiveTableKingOfTheDayComponent, {
      header: 'Król dnia tabela na żywo',
      width: dialogWidth,
      height: 'auto',
      data: {
        players: this._getPlayersList(),
      },
    });
  }

  removeMatch(index: number) {
    this.matches.splice(index, 1);
    this.matchesList = this.matches.slice(0, 5);
  }

  saveKingOfTheDay() {
    const screenWidth = window.innerWidth;
    const dialogWidth = screenWidth > 992 ? '50vw' : '90vw';

    this.dialog = this._dialogSerivce.open(SaveKingOfTheDayComponent, {
      header: 'Zakończ wydarzenie',
      width: dialogWidth,
      height: 'auto',
      data: {
        winners: this._getTopPlayers(),
      },
    });
  }

  private _getPlayersList(): User[] {
    const userMap: { [key: string]: { user: User; wins: number } } = {};

    this.matches.forEach((match) => {
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

    usersWithWins.forEach((entry) => {
      entry.user.kingOfTheDayCoutWins = entry.wins;
    });

    return usersWithWins.map((entry) => entry.user);
  }

  private _getTopPlayers(): User[] {
    const playersList = this._getPlayersList();

    if (playersList.length === 0) {
      return [];
    }

    const topPlayers: User[] = [playersList[0]];
    const topWins = playersList[0].kingOfTheDayCoutWins;

    for (let i = 1; i < playersList.length; i++) {
      if (playersList[i].kingOfTheDayCoutWins === topWins) {
        topPlayers.push(playersList[i]);
      } else {
        break;
      }
    }

    return topPlayers;
  }
}
