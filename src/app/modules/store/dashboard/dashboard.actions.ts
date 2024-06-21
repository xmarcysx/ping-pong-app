import { createAction, props } from '@ngrx/store';
import { Match } from '../../models/match';

export const loadUserMatches = createAction(
  '[User] Load UserMatches',
  props<{ userId: string }>()
);

export const loadUserMatchesSuccess = createAction(
  '[User] Load Matches Success',
  props<{ matches: Match[] }>()
);

export const addNewMatchSuccess = createAction(
  '[User] New Match Success',
  props<{ match: Match }>()
);

export const addMatchToUserMatches = createAction(
  '[User Matches] Add Match',
  props<{ match: Match }>()
);
