import { Component, Input } from '@angular/core';
import { Match } from '../../modules/models/match';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss',
})
export class MatchComponent {
  @Input() match!: Match;
}
