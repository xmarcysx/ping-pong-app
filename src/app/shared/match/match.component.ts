import { Component, Input } from '@angular/core';
import { Match } from '../../modules/models/match';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [OverlayPanelModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss',
})
export class MatchComponent {
  @Input() match!: Match;

  openRivalDataDialog() {}
}
