import { Component, OnInit } from '@angular/core';
import { MatchComponent } from '../../../shared/match/match.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { User } from '../../models/user';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
  imports: [MatchComponent, OverlayPanelModule],
})
export class RankingComponent implements OnInit {
  players: User[] | undefined = [];

  constructor(private _getFromFirebaseService: GetFromFirebaseService) {}

  ngOnInit(): void {
    this._getFromFirebaseService.getAllUsers().subscribe((res) => {
      this.players = res?.sort(
        (a, b) => this.getWinRatio(b) - this.getWinRatio(a)
      );
    });
  }

  getWinRatio(player: User) {
    const matches = player.wins + player.loses;
    return matches > 0 ? (player.wins / matches) * 100 : 0;
  }
}
