import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() removeEventEmitter = new EventEmitter();
  @Input() match!: Match;
  @Input() kingOfTheDay = false;
  @Input() isViewMode = false;

  getBackground() {
    if (this.kingOfTheDay) {
      return 'match-undefined';
    } else {
      return this.match!.win ? 'match-win' : 'match-lose';
    }
  }
}
