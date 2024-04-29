import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MatchComponent } from '../../../shared/match/match.component';

@Component({
  selector: 'app-matches-history',
  standalone: true,
  templateUrl: './matches-history.component.html',
  styleUrl: './matches-history.component.scss',
  imports: [DropdownModule, MatchComponent],
})
export class MatchesHistoryComponent {}
