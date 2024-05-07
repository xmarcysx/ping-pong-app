import { Injectable } from '@angular/core';
import { GetFromFirebaseService } from './get-from-firebase.service';
import { AddMatch } from '../models/add-match';
import { HttpClient } from '@angular/common/http';
import { firebaseConfig } from '../../app.config';
import { SpinnerService } from './spinner.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddMatchComponent } from '../../shared/add-match/add-match.component';

@Injectable({ providedIn: 'root' })
export class AddMatchService {
  db = firebaseConfig.databaseURL;

  constructor(
    private _getFromFirebaseService: GetFromFirebaseService,
    private _http: HttpClient,
    private _dialogService: DialogService,
    private _spinnerService: SpinnerService
  ) {}

  addMatchToDb(addMatchObject: AddMatch) {
    this._spinnerService.toTrue();
    this._closeDialog();
    const currentUserUid = addMatchObject.you?.uid;
    const rivalUserUid = addMatchObject.rival?.uid;
    const yourResult = addMatchObject.yourResult;
    const rivalResult = addMatchObject.rivalResult;

    this._updateUserMatchesData(currentUserUid!, yourResult, addMatchObject);
    this._updateUserMatchesData(rivalUserUid!, rivalResult, addMatchObject);
  }

  private _updateUserMatchesData(
    userUid: string,
    userResult: number,
    addMatchObject: AddMatch
  ) {
    this._getFromFirebaseService.getUserKey(userUid).subscribe((userKey) => {
      this._http
        .post(this.db + `/users/${userKey}/matches.json`, {
          ...addMatchObject,
          win: this._isMatchWin(userResult),
        })
        .subscribe((res) => {
          this._getFromFirebaseService.updateUserMatchesResult(
            userUid,
            userKey!,
            this._isMatchWin(userResult)
          );
        });
    });
  }

  private _isMatchWin(userResult: number): boolean {
    return userResult === 3 ? true : false;
  }

  private _closeDialog() {
    this._dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
