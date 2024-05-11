import { Component, OnInit } from '@angular/core';
import { MatchComponent } from '../../../shared/match/match.component';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../../shared/add-match/add-match.component';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { AuthService } from '../../services/auth.service';
import { Match } from '../../models/match';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatchComponent, FormSubmitBtnComponent],
})
export class DashboardComponent implements OnInit {
  matches: Match[] = [];

  constructor(
    private _dialogSerivce: DialogService,
    private _getFromFirbaseService: GetFromFirebaseService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._getUserMatches();
  }

  openAddMatchDialog() {
    this._dialogSerivce.open(AddMatchComponent, {
      header: 'Dodaj mecz',
      width: '40vw',
      height: 'auto',
    });
  }

  private _getUserMatches() {
    const userUid = this._auth.currentUser()!.uid;
    this._getFromFirbaseService.getUserMatches(userUid).subscribe((res) => {
      this.matches = res;
    });
  }
}
