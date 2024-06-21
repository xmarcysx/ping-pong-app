import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  addMatchToUserMatches,
  addNewMatchSuccess,
  loadUserMatches,
  loadUserMatchesSuccess,
} from './dashboard.actions';
import { GetFromFirebaseService } from '../../services/get-from-firebase.service';
import { AddMatchService } from '../../services/add-match.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Injectable()
export class UserEffects {
  loadMatches$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUserMatches),
      switchMap((action) =>
        this._getFromFirbaseService
          .getUserMatches(action.userId)
          .pipe(map((matches) => loadUserMatchesSuccess({ matches })))
      )
    )
  );

  updateMatchesWhenNewMatchAdded$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(addNewMatchSuccess),
        tap((action) => {
          const { rival, you, win, ...objtoSave } = action.match;
          this._addMatchService.addMatchToDb(objtoSave);
          this._store.dispatch(addMatchToUserMatches({ match: action.match }));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _addMatchService: AddMatchService,
    private _store: Store<AppState>,
    private _getFromFirbaseService: GetFromFirebaseService
  ) {}
}
