import { Component, OnInit } from '@angular/core';
import { FormSubmitBtnComponent } from '../form-submit-btn/form-submit-btn.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { User } from '../../modules/models/user';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Match } from '../../modules/models/match';

@Component({
  selector: 'app-live-table-king-of-the-day',
  standalone: true,
  imports: [FormSubmitBtnComponent, OverlayPanelModule],
  templateUrl: './live-table-king-of-the-day.component.html',
  styleUrl: './live-table-king-of-the-day.component.scss',
})
export class LiveTableKingOfTheDayComponent implements OnInit {
  players: User[] | undefined = [];

  constructor(
    private _dynamicDialogConfig: DynamicDialogConfig,
    private _dynamicDialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this._readConfig();
  }

  close() {
    this._dynamicDialogRef.close();
  }

  private _readConfig() {
    this.players = this._dynamicDialogConfig.data.players;
  }
}
