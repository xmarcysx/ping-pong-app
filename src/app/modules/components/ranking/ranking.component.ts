import { Component, OnInit } from '@angular/core';
import { MatchComponent } from '../../../shared/match/match.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { User } from '../../models/user';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-ranking',
  standalone: true,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
  imports: [MatchComponent, OverlayPanelModule, PaginatorModule],
})
export class RankingComponent implements OnInit {
  players: User[] = [];
  playersList: User[] = [];
  first: number = 0;
  rows: number = 5;

  constructor(private _getFromFirebaseService: GetFromFirebaseService) {}

  ngOnInit(): void {
    this._getFromFirebaseService.getAllUsers().subscribe((res) => {
      this.players = res!.sort(
        (a, b) => this.getWinRatio(b) - this.getWinRatio(a)
      );

      this.playersList = this.players.slice(this.first, this.rows);
    });
  }

  getWinRatio(player: User) {
    const matches = player.wins + player.loses;
    return matches > 0 ? Math.round((player.wins / matches) * 100) : 0;
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first as number;
    this.rows = event.rows as number;
    const from = (event.page as number) * 5;
    const to = from + 5;
    this.playersList = this.players.slice(from, to);
  }
}
