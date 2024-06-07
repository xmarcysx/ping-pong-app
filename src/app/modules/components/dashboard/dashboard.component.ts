import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchComponent } from '../../../shared/match/match.component';
import { FormSubmitBtnComponent } from '../../../shared/form-submit-btn/form-submit-btn.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../../shared/add-match/add-match.component';
import { AuthService } from '../../services/auth.service';
import { Match } from '../../models/match';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { RacketAnimationComponent } from '../../../shared/racket-animation/racket-animation.component';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [MatchComponent, FormSubmitBtnComponent, RacketAnimationComponent],
})
export class DashboardComponent implements OnInit, OnDestroy {
  matches: Match[] = [];
  private _subscription = new Subscription();

  constructor(
    public spinnerService: SpinnerService,
    private _angularFireDatabase: AngularFireDatabase,
    private _dialogSerivce: DialogService,
    private _getFromFirbaseService: GetFromFirebaseService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._watchMatches();
  }

  openAddMatchDialog() {
    const screenWidth = window.innerWidth;
    const dialogWidth = screenWidth > 992 ? '50vw' : '90vw';

    this._dialogSerivce.open(AddMatchComponent, {
      header: 'Dodaj wynik meczu',
      width: dialogWidth,
      height: 'auto',
      data: {
        isKingOfTheDayMode: false,
      },
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _getUserMatches() {
    const userUid = this._auth.currentUser()!.uid;
    if (userUid) {
      this._getFromFirbaseService.getUserMatches(userUid).subscribe((res) => {
        this.spinnerService.toFalseInnerSpinner();
        this.matches = res;
      });
    } else {
      this.spinnerService.toFalseInnerSpinner();
    }
  }

  private _watchMatches() {
    this.spinnerService.toTrueInnerSpinner();
    const userUid = this._auth.currentUser()!.uid;
    if (userUid)
      this._subscription.add(
        this._angularFireDatabase
          .list(`matches-${userUid}`)
          .valueChanges()
          .subscribe((res) => {
            setTimeout(() => {
              this._getUserMatches();
            }, 1000);
          })
      );
  }
}
