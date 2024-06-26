import { Injectable } from '@angular/core';
import { Match } from '../models/match';
import { HttpClient } from '@angular/common/http';
import { firebaseConfig } from '../../app.config';
import { SpinnerService } from './spinner.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetFromFirebaseService } from './get-from-firebase.service';

@Injectable({ providedIn: 'root' })
export class AddMatchService {
  db = firebaseConfig.databaseURL;

  constructor(
    private _getFromFirebaseService: GetFromFirebaseService,
    private _http: HttpClient,
    private _dialogService: DialogService,
    private _spinnerService: SpinnerService
  ) {}

  addMatchToDb(addMatchObject: Match) {
    this._closeDialog();
    const currentUserUid = addMatchObject.youUid;
    const rivalUserUid = addMatchObject.rivalUid;
    const yourResult = addMatchObject.yourResult;
    const rivalResult = addMatchObject.rivalResult;

    this._updateUserMatchesData(
      currentUserUid!,
      yourResult,
      rivalResult,
      addMatchObject
    );
    this._updateUserMatchesData(rivalUserUid!, rivalResult, yourResult, {
      ...addMatchObject,
      youUid: rivalUserUid,
      yourResult: rivalResult,
      rivalResult: yourResult,
      rivalUid: currentUserUid,
    });
  }

  private _updateUserMatchesData(
    userUid: string,
    userResult: number,
    rivalResult: number,
    addMatchObject: Match
  ) {
    this._getFromFirebaseService.getUserKey(userUid).subscribe((userKey) => {
      this._http
        .post(this.db + `/matches-${userUid}.json`, {
          ...addMatchObject,
          win: this._isMatchWin(userResult, rivalResult),
        })
        .subscribe((res) => {
          this._getFromFirebaseService.updateUserMatchesResult(
            userUid,
            userKey!,
            this._isMatchWin(userResult, rivalResult)
          );
        });
    });
  }

  private _isMatchWin(userResult: number, rivalResult: number): boolean {
    if (userResult > rivalResult) {
      return true;
    } else {
      return false;
    }
  }

  private _closeDialog() {
    this._dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
