import { Component } from '@angular/core';
import { MatchComponent } from '../../../shared/match/match.component';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../../shared/add-match/add-match.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatchComponent, FormSubmitBtnComponent],
})
export class DashboardComponent {
  constructor(private _dialogSerivce: DialogService) {}

  openAddMatchDialog() {
    const dialog = this._dialogSerivce.open(AddMatchComponent, {
      header: 'Dodaj mecz',
      width: '40vw',
      height: '60vh',
    });
  }
}
