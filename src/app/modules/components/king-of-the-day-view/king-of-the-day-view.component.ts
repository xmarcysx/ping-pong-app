import { Component, OnInit } from '@angular/core';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../../shared/add-match/add-match.component';
import { Match } from '../../models/match';
import { MatchComponent } from '../../../shared/match/match.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { LiveTableKingOfTheDayComponent } from '../../../shared/live-table-king-of-the-day/live-table-king-of-the-day.component';
import { User } from '../../models/user';
import { SaveKingOfTheDayComponent } from '../../../shared/save-king-of-the-day/save-king-of-the-day.component';

@Component({
  selector: 'app-king-of-the-day-view',
  standalone: true,
  templateUrl: './king-of-the-day-view.component.html',
  styleUrl: './king-of-the-day-view.component.scss',
  imports: [
    FormSubmitBtnComponent,
    MatchComponent,
    PaginatorModule,
    LiveTableKingOfTheDayComponent,
  ],
})
export class KingOfTheDayViewComponent implements OnInit {
  matchesList: Match[] = [];
  matches: Match[] = [];
  dialog: DynamicDialogRef | undefined;
  first: number = 0;
  rows: number = 5;
  isViewMode = false;

  constructor(
    private _config: DynamicDialogConfig,
    private _dynamicDialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this._readConfig();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first as number;
    this.rows = event.rows as number;
    const from = (event.page as number) * 5;
    const to = from + 5;
    this.matchesList = this.matches.slice(from, to);
  }

  close() {
    this._dynamicDialogRef.close();
  }

  private _readConfig() {
    if (!this._config?.data) {
      return;
    }

    const { isViewMode, matches } = this._config.data;
    this.isViewMode = isViewMode;
    this.matches = matches;
    this.matchesList = this.matches.slice(0, 5);
  }
}
