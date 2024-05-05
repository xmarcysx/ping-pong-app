import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../app.config';
import { map, find, Observable, tap, from } from 'rxjs';
import { User } from '../models/user';
import { SettingsFormValue } from '../models/settings-form';
import { getDatabase, ref, update } from 'firebase/database';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';

@Injectable({ providedIn: 'root' })
export class GetFromFirebaseService {
  db = firebaseConfig.databaseURL;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _spinnerService: SpinnerService
  ) {}

  getCurrentUser(uid: string): Observable<User | undefined> {
    return this._http.get(this.db + '/users.json').pipe(
      map((users) => {
        const usersArray = Object.values(users) as User[];
        return usersArray.find((user: User) => user.uid === uid);
      })
    );
  }

  getCurrentUserKey(uid: string): Observable<string | undefined> {
    return this._http.get<User[]>(`${this.db}/users.json`).pipe(
      map((users) => {
        const usersArray = Object.values(users) as User[];
        const userIndex = usersArray.findIndex(
          (user: User) => user.uid === uid
        );

        return Object.keys(users)[userIndex];
      })
    );
  }

  getAllUsers(): Observable<User[] | undefined> {
    return this._http
      .get(this.db + '/users.json')
      .pipe(map((users) => Object.values(users) as User[]));
  }

  getRivalsList(
    currentUseruid: string | undefined
  ): Observable<User[] | undefined> {
    return this._http.get(this.db + '/users.json').pipe(
      map((users) => {
        const usersArray = Object.values(users) as User[];
        return usersArray.filter((user: User) => user.uid !== currentUseruid);
      })
    );
  }

  updateCurrentUser(uid: string, form: SettingsFormValue) {
    this.getCurrentUserKey(uid).subscribe((res) => {
      this._http
        .patch(this.db + `/users/${res}.json`, {
          username: form.username,
          profileImg: form.image,
        })
        .subscribe((res) => this._spinnerService.toFalse());
    });
  }
}
