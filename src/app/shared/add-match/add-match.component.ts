import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/services/auth.service';
import { User } from '../../modules/models/user';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { FormSubmitBtnComponent } from '../form-submit-btn/form-submit-btn.component';
import { ToastService } from '../../modules/services/toast.service';
import { Match } from '../../modules/models/match';
import { AddMatchService } from '../../modules/services/add-match.service';
import { GetFromFirebaseService } from '../../modules/services/get-from-firebase.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-match',
  standalone: true,
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.scss',
  imports: [
    FormsModule,
    DropdownModule,
    RatingModule,
    FormSubmitBtnComponent,
    SelectButtonModule,
    CommonModule,
  ],
})
export class AddMatchComponent implements OnInit {
  stateOptions: any[] = [
    { label: 'Gracz', value: 'normal' },
    { label: 'Sędzia', value: 'referee' },
  ];
  selectValue: string = 'normal';

  rivalList: User[] | undefined;
  playersList: User[] | undefined;
  rival: User | undefined = undefined;
  player1: User | undefined = undefined;
  player2: User | undefined = undefined;
  you!: User | undefined | null;
  isKingOfTheDayMode = false;
  yourResult = 0;
  rivalResult = 0;
  balls = 3;
  format = { sets: 3, label: 'Do 3 wygranych setów' };
  scoreList = [
    { id: 0, label: '0' },
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
  ];
  formatList = [
    { sets: 3, label: 'Do 3 wygranych setów' },
    { sets: 2, label: 'Do 2 wygranych setów' },
    { sets: 1, label: 'Do 1 wygranej setów' },
  ];

  constructor(
    private _authService: AuthService,
    private _getFromFirebase: GetFromFirebaseService,
    private _toastService: ToastService,
    private _addMatchService: AddMatchService,
    private _dynamicDialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this._readConfig();
    this._getYou();
    this._getRivalList();
    this._getPlayersList();
  }

  getResultClass(yourResult: number, rivalResult: number) {
    if (yourResult === this.balls && rivalResult !== this.balls) {
      return 'win-record';
    } else if (rivalResult === this.balls && yourResult !== this.balls) {
      return 'lose-record';
    } else {
      return 'undefined-record';
    }
  }

  formatChanged(e: DropdownChangeEvent) {
    if (e?.value?.sets) {
      this.balls = e.value.sets;
    } else {
      this.balls = 0;
    }
  }

  clearValues() {
    this.yourResult = 0;
    this.rivalResult = 0;
    this.rival = undefined;
    this.player1 = undefined;
    this.player2 = undefined;
  }

  save() {
    if (this.selectValue === 'normal') {
      if (
        this.rival !== undefined &&
        ((this.rivalResult === this.balls && this.yourResult !== this.balls) ||
          (this.rivalResult !== this.balls && this.yourResult === this.balls))
      ) {
        const objToSave: Match = {
          youUid: this.you!.uid,
          rivalUid: this.rival!.uid,
          yourResult: this.yourResult ? this.yourResult : 0,
          rivalResult: this.rivalResult ? this.rivalResult : 0,
          date: new Date(),
          isApproved: true,
        };

        this._addMatchService.addMatchToDb(objToSave);
      } else {
        this._toastService.error(
          'Nie podano wszystkich informacji o wyniku spotkania'
        );
      }
    }

    if (this.selectValue === 'referee') {
      if (
        this.player1 !== undefined &&
        this.player2 !== undefined &&
        this.player1.uid !== this.player2.uid &&
        ((this.rivalResult === this.balls && this.yourResult !== this.balls) ||
          (this.rivalResult !== this.balls && this.yourResult === this.balls))
      ) {
        const objToSave: Match = {
          youUid: this.player1!.uid,
          rivalUid: this.player2!.uid,
          yourResult: this.yourResult ? this.yourResult : 0,
          rivalResult: this.rivalResult ? this.rivalResult : 0,
          date: new Date(),
          isApproved: true,
        };
        this._addMatchService.addMatchToDb(objToSave);
      } else {
        this._toastService.error('Wystąpił błąd');
      }
    }
  }

  private _readConfig() {
    this.isKingOfTheDayMode = this._dynamicDialogConfig.data.isKingOfTheDayMode;

    if (this.isKingOfTheDayMode) {
      this.balls = 1;
    }
  }

  private _getYou() {
    this.you = this._authService.currentUser();
  }

  private _getRivalList() {
    const currentUserUid = this._authService.currentUser()?.uid;
    this._getFromFirebase.getRivalsList(currentUserUid).subscribe((res) => {
      this.rivalList = res;
    });
  }

  private _getPlayersList() {
    this._getFromFirebase.getAllUsers().subscribe((res) => {
      this.playersList = res;
    });
  }
}
