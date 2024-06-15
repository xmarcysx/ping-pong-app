import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firebaseConfig } from '../../app.config';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user';
import { SettingsFormValue } from '../models/settings-form';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';
import { User as UserFromFirebase } from 'firebase/auth';
import { Match } from '../models/match';

@Injectable({ providedIn: 'root' })
export class GetFromFirebaseService {
  db = firebaseConfig.databaseURL;
  users = signal<User[] | undefined>([]);

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _spinnerService: SpinnerService
  ) {}

  getCurrentUser(uid: string): Observable<User | undefined> {
    this._spinnerService.toFalse();
    return this._http.get(this.db + '/users.json').pipe(
      map((users) => {
        const usersArray = Object.values(users) as User[];
        return usersArray.find((user: User) => user.uid === uid);
      })
    );
  }

  getUser(uid: string): Observable<User | undefined> {
    this._spinnerService.toFalse();
    if (this.users()?.length) {
      const user = this.users()?.find((user: User) => user.uid === uid);
      return of(user);
    } else {
      return this._http.get(this.db + '/users.json').pipe(
        map((users) => {
          const usersArray = Object.values(users) as User[];
          return usersArray.find((user: User) => user.uid === uid);
        })
      );
    }
  }

  getUserMatchesList(uid: string): Observable<Match[] | undefined> {
    this._spinnerService.toFalse();
    return this._http.get(this.db + `/matches-${uid}.json`).pipe(
      map((matches) => {
        if (!matches) {
          return [];
        }
        const matchesArray = Object.values(matches) as Match[];
        return matchesArray;
      })
    );
  }

  getUserKey(uid: string): Observable<string | undefined> {
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
    this.getUserKey(uid).subscribe((res) => {
      this._http
        .patch(this.db + `/users/${res}.json`, {
          username: form.username,
          profileImg: form.image,
        })
        .subscribe((res) => {
          this.getCurrentUser(uid).subscribe((res) => {
            this._authService.currentUser.set({
              profileImg: res?.profileImg!,
              username: res?.username!,
              loses: res?.loses!,
              wins: res?.wins!,
              uid: res?.uid!,
              kingOfTheDayWins: res?.kingOfTheDayWins!,
            });
          });

          this._spinnerService.toFalse();
        });
    });
  }

  updateUserKingOfTheDay(user: User) {
    this.getUserKey(user.uid).subscribe((res) => {
      this._http
        .patch(this.db + `/users/${res}.json`, {
          kingOfTheDayWins: user.kingOfTheDayWins + 1,
        })
        .subscribe((res) => {
          this._spinnerService.toFalse();
        });
    });
  }

  updateUserMatchesResult(
    userUid: string,
    userKey: string,
    isMatchWon: boolean
  ) {
    this.getCurrentUser(userUid).subscribe((user) => {
      this._http
        .patch(`${this.db}/users/${userKey}.json`, {
          wins: isMatchWon ? user!.wins + 1 : user?.wins,
          loses: !isMatchWon ? user!.loses + 1 : user?.loses,
        })
        .subscribe((res) => {
          this._spinnerService.toFalse();
        });
    });
  }

  getUserMatches(userUid: string) {
    return this.getUserMatchesList(userUid).pipe(
      switchMap((matches) => {
        if (!matches?.length) {
          return of([]);
        }

        const sortedMatches = matches.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const fetchObservables = sortedMatches.map((match) => {
          const youUid = match.youUid;
          const rivalUid = match.rivalUid;
          const userObservable = this.getUser(youUid);
          const rivalObservable = this.getUser(rivalUid);

          return forkJoin([userObservable, rivalObservable]).pipe(
            map(([you, rival]) => {
              match.you = you;
              match.rival = rival;
              return match;
            })
          );
        });

        return forkJoin(fetchObservables).pipe(
          map((updatedMatches) => {
            return updatedMatches.slice(0, 5);
          })
        );
      })
    );
  }

  getUserMatchesWithRival(userUid: string, rivalUid: string) {
    return this.getUserMatchesList(userUid).pipe(
      switchMap((matches) => {
        if (!matches?.length) {
          return of([]);
        }

        const filteredMatches = matches.filter(
          (match) => match.rivalUid === rivalUid
        );

        if (!filteredMatches.length) {
          return of([]);
        }

        const sortedMatches = filteredMatches.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const fetchObservables = sortedMatches.map((match) => {
          const youUid = match.youUid;
          const rivalUid = match.rivalUid;
          const userObservable = this.getUser(youUid);
          const rivalObservable = this.getUser(rivalUid);

          return forkJoin([userObservable, rivalObservable]).pipe(
            map(([you, rival]) => {
              match.you = you;
              match.rival = rival;
              return match;
            })
          );
        });

        return forkJoin(fetchObservables).pipe(
          map((updatedMatches) => {
            updatedMatches.forEach((updatedMatch, index) => {
              sortedMatches[index].rival = updatedMatch.rival;
            });
            return sortedMatches.slice(0, 5);
          })
        );
      })
    );
  }
}
