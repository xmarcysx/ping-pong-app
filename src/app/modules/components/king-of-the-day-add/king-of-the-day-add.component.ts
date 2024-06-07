import { Component } from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../../shared/add-match/add-match.component';
import { Match } from '../../models/match';
import { MatchComponent } from '../../../shared/match/match.component';

@Component({
  selector: 'app-king-of-the-day-add',
  standalone: true,
  templateUrl: './king-of-the-day-add.component.html',
  styleUrl: './king-of-the-day-add.component.scss',
  imports: [FormSubmitBtnComponent, MatchComponent],
})
export class KingOfTheDayAddComponent {
  matches: Match[] = [];
  dialog: DynamicDialogRef | undefined;

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
        this.matches.push(res);
      }
    });
  }

  saveKingOfTheDay() {}
}
