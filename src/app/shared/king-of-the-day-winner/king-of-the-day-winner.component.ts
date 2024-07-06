import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../modules/models/match';
import { User } from '../../modules/models/user';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { KingOfTheDayAddComponent } from '../../modules/components/king-of-the-day-add/king-of-the-day-add.component';
import { KingOfTheDayViewComponent } from '../../modules/components/king-of-the-day-view/king-of-the-day-view.component';

@Component({
  selector: 'app-king-of-the-day-winner',
  standalone: true,
  imports: [OverlayPanelModule, TooltipModule],
  templateUrl: './king-of-the-day-winner.component.html',
  styleUrl: './king-of-the-day-winner.component.scss',
})
export class KingOfTheDayWinnerComponent {
  @Input() matches: Match[] = [];
  @Input() player: User | undefined;
  @Input() viewMode = false;

  constructor(private _dialogService: DialogService) {}

  openMoreDetails() {
    const screenWidth = window.innerWidth;
    const dialogWidth = screenWidth > 992 ? '50vw' : '90vw';

    this._dialogService.open(KingOfTheDayViewComponent, {
      header: 'Szczegóły króla dnia',
      width: dialogWidth,
      height: 'auto',
      data: {
        isViewMode: true,
        matches: this.matches,
      },
    });
  }

  formatDate(dateInput: Date) {
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
