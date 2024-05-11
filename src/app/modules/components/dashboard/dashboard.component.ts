import { Component, OnInit } from '@angular/core';
import { MatchComponent } from '../../../shared/match/match.component';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../../shared/add-match/add-match.component';
import { AuthService } from '../../services/auth.service';
import { Match } from '../../models/match';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { RacketAnimationComponent } from '../../../shared/racket-animation/racket-animation.component';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatchComponent, FormSubmitBtnComponent, RacketAnimationComponent],
})
export class DashboardComponent implements OnInit {
  matches: Match[] = [];

  constructor(
    public spinnerService: SpinnerService,
    private _dialogSerivce: DialogService,
    private _getFromFirbaseService: GetFromFirebaseService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._getUserMatches();
  }

  openAddMatchDialog() {
    this._dialogSerivce.open(AddMatchComponent, {
      header: 'Dodaj wynik meczu',
      width: '40vw',
      height: 'auto',
    });
  }

  private _getUserMatches() {
    const userUid = this._auth.currentUser()!.uid;
    if (userUid) {
      this.spinnerService.toTrueInnerSpinner();
      this._getFromFirbaseService.getUserMatches(userUid).subscribe((res) => {
        this.spinnerService.toFalseInnerSpinner();
        this.matches = res;
      });
    } else {
      this.spinnerService.toFalseInnerSpinner();
    }
  }
}
