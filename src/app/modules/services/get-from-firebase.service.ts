import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firebaseConfig } from '../../app.config';
import { map, find, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class GetFromFirebaseService {
  db = firebaseConfig.databaseURL;

  constructor(private _http: HttpClient) {}

  getCurrentUser(uid: string): Observable<User | undefined> {
    return this._http.get(this.db + '/users.json').pipe(
      map((users) => {
        const usersArray = Object.values(users) as User[];
        return usersArray.find((user: User) => user.uid === uid);
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
}
